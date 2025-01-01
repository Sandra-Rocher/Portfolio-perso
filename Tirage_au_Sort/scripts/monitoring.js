
//If one or two buttons are modified, the function will be executed for hide the PDF download button and hide winners list
// Because if we change the number of participants or the number of winners, that change the list of winners.

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("maxParticipants").addEventListener("input", resetWinners);
    document.getElementById("numWinners").addEventListener("input", resetWinners);
});

function resetWinners() {
   // Hide the list of winners
    const winnersList = document.getElementById("winnersList");
    if (winnersList) {
        winnersList.innerHTML = "";
    }

    // Hide the PDF download button
    const downloadPDFButton = document.getElementById("downloadPDF");
    if (downloadPDFButton) {
        downloadPDFButton.style.display = "none";
    }

    // Resets the results title
    const winMessage = document.getElementById("win");
    if (winMessage) {
        winMessage.textContent = "";
    }
}