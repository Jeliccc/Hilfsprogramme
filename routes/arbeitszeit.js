const express = require('express');
const router = express.Router();
const PORT = 3000;


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate-button').addEventListener('click', function() {
        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;

        var start = new Date('1970-01-01T' + startTime + 'Z').getTime(); 
        var end = new Date('1970-01-01T' + endTime + 'Z').getTime();
        var total = end - start;

        var seconds = Math.floor((total / 1000) % 60);
        var minutes = Math.floor((total / (1000 * 60)) % 60);
        var hours = Math.floor((total / (1000 * 60 * 60)) % 24);

        // Ausgabe in das output-Element
        document.getElementById('work-hours').textContent = hours + " Stunden " + minutes + " Minuten " + seconds + " Sekunden";
    });
});

module.exports = router;
