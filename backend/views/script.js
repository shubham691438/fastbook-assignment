async function fetchData() {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      document.getElementById('content').textContent = data.message;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the async function to fetch and update data
  fetchData();