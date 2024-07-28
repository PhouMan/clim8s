
// wait for message of cursor hover over element
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COMPANY_INFO') {

      // get company name
      let currentCompanyInfo = request.data;
      console.log(currentCompanyInfo);

      // query database for grade
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

          // change extension to include grade
          console.log(data.result);
          document.getElementById('response').textContent = data.result;
        })
        .catch(error => console.error('Error:', error));
  }
});
