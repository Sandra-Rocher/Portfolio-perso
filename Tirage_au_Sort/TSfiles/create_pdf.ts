// Import jsPDF types (assurez-vous que jsPDF est installé dans votre projet)
import { jsPDF } from "jspdf";

// Generate PDF with the draw results (and, if button clicked, geolocation results)
function createPDF(): void {
    // Geolocation variables by default
    let road: string = "Unknow";
    let city: string = "Unknow";
    let country: string = "Unknow";
    let postcode: string = "Unknow";

    // Get date and time
    const today: Date = new Date();
    const date: string = today.toLocaleDateString();
    const time: string = today.toLocaleTimeString();

    // Get lottery data
    const maxParticipants: string = (document.getElementById("maxParticipants") as HTMLInputElement)?.value || "Inconnu";
    const numWinners: string = (document.getElementById("numWinners") as HTMLInputElement)?.value || "Inconnu";
    const winnersList: HTMLUListElement | null = document.getElementById("winnersList") as HTMLUListElement;
    const winners: string[] = winnersList ? Array.from(winnersList.querySelectorAll("li")).map((li) => li.textContent || "") : [];

    const generatePDFContent = (): void => {
        const pdf = new jsPDF();

        // Find the total dimensions of the width and height of the page
        const pageWidth: number = pdf.internal.pageSize.getWidth();
        const pageHeight: number = pdf.internal.pageSize.getHeight();

        // Margin of the page and start a Y position for every line of text
        const margin: number = 10;
        let yPosition: number = 10;

        // Add geolocation annotation on the top right corner only if geolocation details are available/accepted
        if (country !== "Non disponible" || city !== "Non disponible") {
            const geolocationDetails: string = `
                Pays: ${country}
                Ville: ${city}
                Code postal: ${postcode}
                Rue: ${road}
            `.trim();

            const annotationWidth: number = 10;
            const annotationX: number = pageWidth - annotationWidth - 5;
            const annotationY: number = 5;

            pdf.createAnnotation({
                type: "text",
                title: "Informations de localisation",
                bounds: {
                    x: annotationX,
                    y: annotationY,
                    w: annotationWidth,
                    h: 40,
                },
                contents: geolocationDetails,
                open: false,
            });
        }

        // Header
        pdf.setFontSize(16);
        pdf.text("Preuve du tirage au sort - Ma Petite Loterie", 50, yPosition);
        yPosition += 10;

        // Line black + bold size 1
        pdf.setLineWidth(1);
        pdf.line(10, yPosition, pageWidth - 10, yPosition);
        yPosition += 10;

        pdf.setFontSize(13);
        pdf.text("Conditions :", 10, yPosition);

        // Calculate the width of the text to draw the underline (bold size 0.3 only)
        const underlineWidth1: number = pdf.getTextWidth("Conditions :");
        pdf.setLineWidth(0.3);
        pdf.line(10, yPosition + 1, 10 + underlineWidth1, yPosition + 1);
        yPosition += 10;

        // Lottery details
        pdf.setFontSize(10);
        pdf.text(`Nombre de participant maximum saisis : ${maxParticipants}`, 10, yPosition);
        yPosition += 10;
        pdf.text(`Nombre de gagnant maximum saisis : ${numWinners}`, 10, yPosition);
        yPosition += 10;

        // New line
        pdf.setLineWidth(1);
        pdf.line(10, yPosition, pageWidth - 10, yPosition);
        yPosition += 10;

        // Draw results
        pdf.setFontSize(13);
        pdf.text("Résultat du tirage au sort de la loterie :", 10, yPosition);

        // Calculate the width of the text to draw the underline (bold size 0.3 only)
        const underlineWidth2: number = pdf.getTextWidth("Résultat du tirage au sort de la loterie :");

        pdf.setLineWidth(0.3);
        pdf.line(10, yPosition + 1, 10 + underlineWidth2, yPosition + 1);
        yPosition += 10;

        // List of winners: if there are too many => add a new page
        pdf.setFontSize(10);
        winners.forEach((winner: string, index: number) => {
            if (yPosition > pageHeight - margin) {
                pdf.addPage();
                yPosition = margin;
            }
            pdf.text(`${index + 1}. ${winner}`, 10, yPosition);
            yPosition += 10;
        });

        // New line and if there are too many => add a new page
        if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
        }
        pdf.setLineWidth(1);
        pdf.line(10, yPosition, pageWidth - 10, yPosition);
        yPosition += 10;

        // Date + Time color grey + center
        pdf.setFontSize(10);
        pdf.setTextColor(105, 105, 105);
        const dateText: string = `Date : ${date} et Heure : ${time}`;
        const textWidth: number = pdf.getTextWidth(dateText);
        pdf.text(dateText, (pageWidth - textWidth) / 2, yPosition);
        yPosition += 10;

        // Download PDF
        // Format : DD_MM_YYYY_HH-MM-SS.pdf
        // pdf.save(`Resultat_Loterie_${date}_${time}.pdf`);
        // Format : DD_MM_YYYY _ HH H MM - SS s /pdf
        const safeDate = date.replace(/\//g, "_"); // "22_10_2025"
        const safeTime = time.replace(/^(\d{2}):(\d{2}):(\d{2})$/, "$1H$2-$3s");
        pdf.save(`Resultat_Loterie_${safeDate}_${safeTime}.pdf`);
    };

    // Attempt to catch geolocation
    navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
            const lat: number = position.coords.latitude;
            const lon: number = position.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                .then((response: Response) => response.json())
                .then((data: any) => {
                    road = data.address.road || road;
                    city = data.address.city || data.address.town || data.address.village || city;
                    country = data.address.country || country;
                    postcode = data.address.postcode || postcode;
                })
                .catch((error: Error) => console.error("Erreur lors de la récupération des données de géolocalisation :", error))
                .finally(() => generatePDFContent());
        },
        () => {
            console.warn("Localisation refusée par l'utilisateur.");
            generatePDFContent();
        }
    );
}
