const express = require('express');
const multer = require('multer');
const router = express.Router();
const natural = require('natural');
const fs = require('fs');

const { createWorker } = require('tesseract.js');

// Creating a tmp directory if it doesn't exist
const tmpDirectory = 'tmp';
if (!fs.existsSync(tmpDirectory)) {
  fs.mkdirSync(tmpDirectory);
}

// Define Multer storage configuration to use the /tmp directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDirectory); // Files will be stored in the "tmp" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
// Initialize Multer middleware with the storage configuration
const upload = multer({ storage: storage });

//route to handle text to image conversion
router.post('/imageToText', upload.single('img'), async (req, res) => {

    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }
     
  
    try {
      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(req.file.path);
      console.log(text);
      await worker.terminate();

      res.status(200).json({ msg: 'Successfully converted image to text', text });
    } 
    
    catch (error) {
      console.error('Error processing the image:', error);
      res.status(500).json({ error: 'Error processing the image' });
    }
});
  





router.post('/wordSuggestion', (req, res) => {
    try {
      const recognizedText = req.body.recognizedText;
      const keywordText = req.body.keywordText;
  
      const tokenizer = new natural.WordTokenizer();
      const recognizedWords = tokenizer.tokenize(recognizedText);
      const keywordList = tokenizer.tokenize(keywordText);
  
      const suggestions = recognizedWords.map((recognizedWord) => {
        const validSuggestions = keywordList
          .map((keyword) => {
            const distance = natural.LevenshteinDistance(recognizedWord, keyword);
            return { keyword, distance };
          })
          .filter((suggestion) => {
            return suggestion.distance > 0 && suggestion.distance <= recognizedWord.length / 2;
          });
  
        const sortedSuggestions = validSuggestions.sort((a, b) => a.distance - b.distance);
  
        const closestSuggestion = sortedSuggestions.length > 0 ? sortedSuggestions[0] : null;
  
        return { recognizedWord, closestSuggestion };
      });
  
      console.log('Word Suggestions:');
      suggestions.forEach((suggestion) => {
        if (suggestion.closestSuggestion) {
          console.log(
            `Word: ${suggestion.recognizedWord}, Closest Keyword: ${suggestion.closestSuggestion.keyword}, Distance: ${suggestion.closestSuggestion.distance}`
          );
        }
      });
  
      // Filter and format the suggestions to include only valid ones.
      const filteredSuggestions = suggestions
        .filter((suggestion) => suggestion.closestSuggestion !== null)
        .map((suggestion) => ({
          recognizedWord: suggestion.recognizedWord,
          closestKeyword: suggestion.closestSuggestion.keyword,
          distance: suggestion.closestSuggestion.distance,
        }));
  
      res.status(200).json({ message: 'Success', suggestions: filteredSuggestions });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router;
