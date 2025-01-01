// If one or two buttons are modified, the function will be executed to hide the PDF download button and the winners list
// Because if we change the number of participants or the number of winners, that changes the list of winners.

document.addEventListener("DOMContentLoaded", () => {
    const maxParticipantsInput = document.getElementById("maxParticipants") as HTMLInputElement | null;
    const numWinnersInput = document.getElementById("numWinners") as HTMLInputElement | null;

    if (maxParticipantsInput) {
        maxParticipantsInput.addEventListener("input", resetWinners);
    }

    if (numWinnersInput) {
        numWinnersInput.addEventListener("input", resetWinners);
    }
});

function resetWinners(): void {
    // Hide the list of winners
    const winnersList = document.getElementById("winnersList") as HTMLElement | null;
    if (winnersList) {
        winnersList.innerHTML = "";
    }

    // Hide the PDF download button
    const downloadPDFButton = document.getElementById("downloadPDF") as HTMLButtonElement | null;
    if (downloadPDFButton) {
        downloadPDFButton.style.display = "none";
    }

    // Reset the results title
    const winMessage = document.getElementById("win") as HTMLElement | null;
    if (winMessage) {
        winMessage.textContent = "";
    }
}
