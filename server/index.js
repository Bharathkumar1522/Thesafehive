import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, suggestions } = req.body;

        // 1. Input Validation
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        // 2. secure retrieval of secrets
        const spreadsheetId = process.env.SPREADSHEET_ID;
        const scriptUrl = process.env.APPS_SCRIPT_URL;

        if (!spreadsheetId || !scriptUrl) {
            console.error('Server configuration error: Missing secrets');
            return res.status(500).json({ error: 'Internal server configuration error' });
        }

        // 3. Construct Payload for Google Apps Script
        // The script expects: name, email, suggestions (mapped from comment), spreadsheetId (if you updated the script to take it, otherwise the script usually hardcodes it. 
        // BUT the user request said: "backend should use environment variables spread sheet id" implies the ID is passed OR the backend inserts it.
        // The provided script has `const SPREADSHEET_ID = ;` which implies we might need to PASS it or the user will fill it in the script?
        // Actually, looking at the user request: "backend should use environment variables spread sheet id... The purpose ... is to securely receive ... sent it to backend."
        // And "Here is the sample code... const SPREADSHEET_ID = ;" -> This implies the script MIGHT expect it or we should modify the script?
        // Wait, the provided script in the prompt has `const SPREADSHEET_ID = ;` which is invalid JS syntax unless filled.
        // The prompt says: "backend should use environment variables spread sheet id".
        // If securely passed, we usually pass it in the payload. 
        // Let's assume we pass it in the payload as 'spreadsheetId' and the Google Script reads it.

        // However, the provided script DOES NOT read spreadsheetId from params. It has a placeholder constant. 
        // I should provide the USER with the updated Google Script that READS it from the payload.
        // I will pass it in the payload.

        const payload = {
            name,
            email,
            suggestions,
            spreadsheetId // secure injection
        };

        // 4. Forward to Google Apps Script
        console.log('Sending data to Apps Script URL:', scriptUrl);

        const response = await axios.post(scriptUrl, payload, {
            headers: { 'Content-Type': 'application/json' },
            maxRedirects: 5
        });

        // 5. Handle Response
        if (response.data && response.data.status === 'success') {
            return res.status(200).json({ success: true, message: 'Message sent successfully' });
        } else {
            console.error('Apps Script Error:', response.data);
            return res.status(500).json({ error: 'Failed to send message' });
        }

    } catch (error) {
        console.error('Backend Error:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
