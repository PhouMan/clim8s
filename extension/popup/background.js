document.getElementById('sendWhisper').addEventListener('click', () => {
  console.log('Button clicked'); // Add this line
  const message = "Hello from the popup!";
  fetch('http://localhost:3000/whisper', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  })
    .then(response => {
      console.log('Received response'); // Add this line
      return response.json();
    })
    .then(data => {
      document.getElementById('response').textContent = data.response;
      console.log('Response data:', data); // Add this line
    })
    .catch(error => console.error('Error:', error));
});