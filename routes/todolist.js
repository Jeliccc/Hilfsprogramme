
const express = require('express');
const router = express.Router();
const PORT = 3000;

// GET Main Page // 
router.get('/', function(req, res, next) {
  res.render('todolist.html', { title: 'Express'});
});



function newElement() {
  var li = document.createElement("li");

  // Eingabewerte 
  var inputValue = document.getElementById("todoInput").value;
  var dateValue = document.getElementById("todoDate").value;

  // Aktuelles Datum und Uhrzeit
  var currentDate = new Date();
  var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  var createdDate = currentDate.toLocaleDateString('de-DE', options);

  //  Erstellungsdatum 
  var createdText = document.createTextNode("Erstellt am: " + createdDate);
  var createdSpan = document.createElement("SPAN");
  createdSpan.className = "created-text";
  createdSpan.appendChild(createdText);

  var taskText = document.createElement("SPAN");
  taskText.className = "task-text";
  taskText.appendChild(document.createTextNode(inputValue + " Zeit bis: " + dateValue));
  
  li.appendChild(createdSpan);
  li.appendChild(taskText);

  // Überprüfen, ob die Eingabefelder ausgefüllt sind
  if (inputValue === '' || dateValue === '') {
    alert("Du musst sowohl ein Ziel als auch ein Datum eintragen!");
  } else {
    document.getElementById("todoUL").appendChild(li);
  }

  // Eingabefelder zurücksetzen
  document.getElementById("todoInput").value = "";
  document.getElementById("todoDate").value = "";

  // Funktionen für Schließen-, Bearbeiten- und Countdown-Button hinzufügen
  addCloseButton(li);
  addEditButton(li, taskText);
  addCountdown(li, dateValue);
}

// Close-Button
function addCloseButton(li) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Ereignis-Handler für den Schließen-Button
  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Funktion zum Hinzufügen eines Bearbeiten-Buttons
function addEditButton(li, taskText) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode(""); 
  span.className = "edit";
  span.appendChild(txt);
  li.appendChild(span);

  // Ereignis-Handler für den Bearbeiten-Button
  span.onclick = function() {
    // Bearbeitungslogik
    var currentText = taskText.textContent;
    var input = prompt("Bearbeiten:", currentText);
    if (input !== null) {
      taskText.textContent = input;
    }
  }
}

// Countdowns
function addCountdown(li, endDate) {
  var countdownSpan = document.createElement("SPAN");
  countdownSpan.className = "countdown";
  li.appendChild(countdownSpan);
  
  var endTime = new Date(endDate).getTime();

  //  Aktualisierung des Countdowns
  function updateCountdown() {
    var now = new Date().getTime();
    var timeLeft = endTime - now;

    // Wenn die Zeit abgelaufen ist
    if (timeLeft < 0) {
      countdownSpan.textContent = " Zeit abgelaufen";
      return;
    }

    // Berechnung der  Tage, Stunden, Minuten und Sekunden
    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Countdown-Text aktualisieren
    countdownSpan.textContent = " Countdown: " + days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }

  // Countdown jede Sekunde aktualisieren
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

module.exports = router;