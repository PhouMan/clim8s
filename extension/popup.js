chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COMPANY_INFO') {
      let currentCompanyInfo = request.data;
      console.log(currentCompanyInfo);

      fetch('http://localhost:3000/whisper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: currentCompanyInfo })
      })
        .then(response => {
          console.log('Received response');
          return response.json();
        })
        .then(data => {
          console.log(data.result);
          document.getElementById('response').textContent = data.result;
        })
        .catch(error => console.error('Error:', error));
  }
});
