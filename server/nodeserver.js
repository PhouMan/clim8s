import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// Initialize Express app\
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Middleware to handle JSON requests and enable CORS
app.use(cors());
app.use(express.json());

// Import your custom module dynamically
const customModulePath = path.resolve('./csvParser.mjs');


// Endpoint to receive whisper
app.post('/whisper', async (req, res) => {
  try {
    // Dynamically import your custom module
    const customModulePath = pathToFileURL(path.resolve(__dirname, './csvParser.mjs')).href;
    const {queryCompanyEnvironmental} = await import(customModulePath);
    const response = await queryCompanyEnvironmental("disney");
    
    res.json({ response });
  } catch (error) {
    console.error('Error handling whisper:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
