// Main function for drawing lots according to the parameters given

function drawLots(): void {
    const maxParticipants: number = parseInt((document.getElementById("maxParticipants") as HTMLInputElement).value);
    const numWinners: number = parseInt((document.getElementById("numWinners") as HTMLInputElement).value);

    // Check if number of winners is greater than max participants
    if (numWinners > maxParticipants) {
        alert("Le nombre de gagnants ne peut pas être supérieur au nombre de participants.");
        return;
    }

    // Check if both fields are filled
    if (!numWinners || !maxParticipants) {
        alert("Vous devez remplir les 2 champs avant de valider.");
        return;
    }

    // Create an array of participants from 1 to maxParticipants
    const participants: number[] = Array.from({ length: maxParticipants }, (_, i) => i + 1);
    const winners: number[] = [];

    // Select random winners
    for (let i = 0; i < numWinners; i++) {
        const randomIndex: number = Math.floor(Math.random() * participants.length);
        const winner: number = participants.splice(randomIndex, 1)[0];
        winners.push(winner);
    }

    // Call function to display winners
    afficherGagnants(winners);
}



// Show winner(s) in a list
function afficherGagnants(winners: number[]): void {
    const win: HTMLElement | null = document.getElementById("win");
    if (win) {
        win.innerHTML = "Les gagnants sont : ";
    }

    const winnersList: HTMLElement | null = document.getElementById("winnersList");
    if (winnersList) {
        winnersList.innerHTML = "";

        winners.forEach((winner: number) => {
            const listItem: HTMLLIElement = document.createElement("li");
            listItem.textContent = `Participant N° ${winner}`;
            winnersList.appendChild(listItem);
        });
  }

    // Show button to download PDF
    const downloadButton: HTMLElement | null = document.getElementById("downloadPDF");
    if (downloadButton) {
        downloadButton.style.display = "inline-block";
    }

    // Trigger the PDF creation function
    generatePDF();
}
