import express from 'express';
import cors from 'cors';
import { queryCompanyEnvironmental}  from './csvParser.mjs';
import { askReport } from './cohereAPI.mjs';

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to handle JSON requests and enable CORS
app.use(cors());
app.use(express.json());

// Endpoint to receive whisper
app.post('/whisper', async (req, res) => {
  try {
    console.log('Received whisper request:', req.body.message);
    let response = await queryCompanyEnvironmental(req.body.message);
    if (!response || response.trim() === '') {
      response = await askReport(req.body.message);
    }
    response = response.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    res.json({ result: response });
  } catch (error) {
    console.error('Error handling whisper:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
