import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

/** * MEMORY DATABASE
 * Stores where objects are so the voice assistant can find them
 **/
let memoryStore = [
    { id: 1, object: "keys", location: "dining table", time: "10:30 AM", status: "normal" },
    { id: 2, object: "wallet", location: "bedroom shelf", time: "09:15 AM", status: "normal" }
];

let alerts = [];

// --- ROUTES ---

// 1. GET ALL OBJECTS (Displays the list on the frontend)
app.get('/api/objects', (req, res) => {
    res.json(memoryStore);
});

// 2. TRACK NEW LOCATION (Triggered when the camera/system detects a move)
app.post('/api/track', (req, res) => {
    const { object, location } = req.body;
    const newEntry = {
        id: memoryStore.length + 1,
        object: object.toLowerCase(),
        location: location,
        time: new Date().toLocaleTimeString(),
        status: "updated"
    };
    memoryStore.push(newEntry);
    res.status(201).json({ message: "Location updated", data: newEntry });
});

// 3. VOICE ASSISTANT SEARCH (Where is my [object]?)
app.get('/api/find/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const item = memoryStore.filter(i => i.object === name).pop(); 

    if (item) {
        res.json({
            voiceText: `Your ${item.object} is at the ${item.location}.`,
            success: true
        });
    } else {
        res.json({
            voiceText: `I'm sorry, I haven't tracked your ${name} yet.`,
            success: false
        });
    }
});

// 4. SAFETY ALERTS (Log unusual activity)
app.post('/api/alert', (req, res) => {
    const { message } = req.body;
    const newAlert = { message, time: new Date().toLocaleTimeString() };
    alerts.push(newAlert);
    res.json({ status: "Alert logged", alert: newAlert });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Memory System Backend running on http://localhost:${PORT}`);
});