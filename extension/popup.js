document.getElementById('sendWhisper').addEventListener('click', () => {
    console.log('Button clicked');
    const message = "disney";
    fetch('http://localhost:3000/whisper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
      .then(response => {
        console.log('Received response');
        return response.json();
      })
      .then(data => {
        console.log(data);
        document.getElementById('response').textContent = data;
        console.log('Response data:', data);
      })
      .catch(error => console.error('Error:', error));

  });
  