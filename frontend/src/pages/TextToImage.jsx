import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Input, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HashLoader from 'react-spinners/HashLoader';

const TextToImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [recognizedText, setRecognizedText] = useState('Text generated from the image after OCR will be displayed here');
    const [keywordText, setKeywordText] = useState('');
    const [suggestedWords, setSuggestedWords] = useState([]);
    const [updatedText, setUpdatedText] = useState('');
    const [imgToTextLoading,setImgToTextLoading]=useState(false);
    const [wordSuggestionLoading,setWordSuggestionLoading]=useState(false);
  
    const backend_url=process.env.REACT_APP_BACKEND_URL
    
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
  
    const handleUploadImage = async () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append('img', selectedFile);
  
        try {
          setImgToTextLoading(true);
          const response = await fetch(`${backend_url}/api/imageToText`, {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            
            const data = await response.json();
            setRecognizedText(data.text);
            
          } else {
            console.error('Error:', response.statusText);
            
          }
          setImgToTextLoading(false)
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };
  
    const handleWordSuggestion = async () => {
      try {
        setWordSuggestionLoading(true);
        const response = await fetch(`${backend_url}/api/wordSuggestion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recognizedText: recognizedText,
            keywordText: keywordText,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setSuggestedWords(data.suggestions);
        } else {
          console.error('Error:', response.statusText);
        }
        setWordSuggestionLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    const applySuggestions = () => {
      // Create a copy of the recognized text to apply suggestions to
      let updatedTextCopy = recognizedText;
  
      // Iterate through suggested words and replace recognized words with closest keywords
      suggestedWords.forEach((word) => {
        updatedTextCopy = updatedTextCopy.replace(new RegExp(word.recognizedWord, 'g'), word.closestKeyword);
      });
  
      // Set the updated text in the state
      setUpdatedText(updatedTextCopy);
    };
  
    return (
      
        <>
        <Typography align='center' variant='h2' >Image to Text Generation</Typography>
        <Box className="App" sx={{  display: 'flex', flexDirection: 'row', justifyContent: 'space-around' ,mt:5}}>
          <Box>
            <Box sx={{ maxWidth: '400px', height: '200px' }}>
              {/* <h1>Image to Text Conversion</h1> */}
              <FormControl>
                <Input type="file" id="img" onChange={handleFileChange} />
              </FormControl>
              <Button sx={{ mt: 1 }} variant="contained" color="primary" onClick={handleUploadImage}>
                Convert to Text
              </Button>
            </Box>
            <Box>
              <h2>Recognized Text:</h2>
              {imgToTextLoading ? (
              <div
                style={{
                 
                  display:"flex",
                  justifyContent:"center",
                  zIndex: 9999,
                }}
              >
                <HashLoader color="#36d7b7" loading={imgToTextLoading} size={150} aria-label="Loading Spinner" data-testid="loader" />
              </div>
            ) : (
              <Box sx={{ minHeight: '200px' ,maxWidth:"500px"}}>{recognizedText}</Box>
            )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '350px', height: '200px' }}>
              <FormControl>
                <TextareaAutosize
                  sx={{ minWidth: "400px" , minHeight: "200px" }}
                  aria-label="empty textarea"
                  placeholder="Enter Keywords"
                  value={keywordText}
                  onChange={(e) => setKeywordText(e.target.value)}
                />
              </FormControl>
  
              <Button sx={{ mt: 1 }} variant="contained" color="primary" onClick={handleWordSuggestion}>
                Generate closest Suggestion Based on Keywords
              </Button>
            </Box>
          </Box>
  
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', }}>
              <h2>Suggested Words:</h2>
            </Box>
  
            {wordSuggestionLoading ? (
              <div
                style={{
                 
                  display:"flex",
                  justifyContent:"center",
                  zIndex: 9999,
                }}
              >
                <HashLoader color="#36d7b7" loading={wordSuggestionLoading} size={150} aria-label="Loading Spinner" data-testid="loader" />
              </div>
            ) : (
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead sx={{ backgroundColor: "red" }}>
                    <TableRow>
                      <TableCell>Original Word</TableCell>
                      <TableCell align="right">Closest Keyword</TableCell>
                      <TableCell align="right">Levenshtein distance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {suggestedWords.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.recognizedWord}
                        </TableCell>
                        <TableCell align="right">{row.closestKeyword}</TableCell>
                        <TableCell align="right">{row.distance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', mt: "100px", justifyContent: "center" }}>
          <Button variant="contained" color="success" onClick={applySuggestions}>
            Apply Suggestions
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection:'column',alignItems:"center" }}>
          <h3>Text After applying Suggestions:</h3>
          <Box sx={{ minHeight: '100px' }}>{updatedText}</Box>
        </Box>
        </>
     
    );
}

export default TextToImage

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };
  
  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );