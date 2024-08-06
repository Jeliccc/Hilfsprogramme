const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to server static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'main.html'));
});

app.get('/arbeitszeit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'arbeitszeit.html'));
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server läuft unter http://localhost:${PORT}`);
});