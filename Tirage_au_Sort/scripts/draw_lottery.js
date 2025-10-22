
// Main function for drawing lots according to the parameters given :
function drawLots() {
    
    var maxParticipants = parseInt(document.getElementById("maxParticipants").value);
    var numWinners = parseInt(document.getElementById("numWinners").value);

    if (numWinners > maxParticipants) {
        alert("Le nombre de gagnants ne peut pas être supérieur au nombre de participants.");
        return;
    }
    
    if (!numWinners || !maxParticipants) {
        alert("Vous devez remplir les 2 champs avant de valider.");
        return;
    }
    
    var participants = Array.from({ length: maxParticipants }, function (_, i) { return i + 1; });
    var winners = [];
    
    for (var i = 0; i < numWinners; i++) {
        var randomIndex = Math.floor(Math.random() * participants.length);
        var winner = participants.splice(randomIndex, 1)[0];
        winners.push(winner);
    }

    //Activ show winner(s) function
    afficherGagnants(winners);
}


// Show winner(s) in a list
function afficherGagnants(winners) {
    var win = document.getElementById("win");
        if (win) {
        win.innerHTML = "Les gagnants sont : ";
    }

    var winnersList = document.getElementById("winnersList");
        if (winnersList) {
        winnersList.innerHTML = "";

        
        winners.forEach(function (winner) {
            var listItem = document.createElement("li");
            listItem.textContent = "Participant N\u00B0 ".concat(winner);
            winnersList.appendChild(listItem);
        });
    }

    // Show button to download PDF
    var downloadButton = document.getElementById("downloadPDF");
    if (downloadButton) {
        downloadButton.style.display = "inline-block";
    }

    // Activ geolocInformations function;
    // generatePDF();
}
