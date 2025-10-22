
//Generate PDF with the draw results (and, if button clicked, geolocation results)
function createPDF() {
    const { jsPDF } = window.jspdf;

    // By default : geolocation values
    let road = "Unknow";
    let city = "Unknow";
    let country = "Unknow";
    let postcode = "Unknow";

    // Get date and time
    const today = new Date();
    const date = today.toLocaleDateString();
    const time = today.toLocaleTimeString();

    // Get winners data
    const maxParticipants = document.getElementById("maxParticipants").value || "Inconnu";
    const numWinners = document.getElementById("numWinners").value || "Inconnu";
    const winnersList = document.getElementById("winnersList");
    const winners = Array.from(winnersList.querySelectorAll("li")).map((li) => li.textContent);

    // Detect if device is mobile or desktop :
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    const generatePDFContent = () => {
        const pdf = new jsPDF();

         // Find the total dimensions of the width and the height of the page
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Margin of the page and start a Y position for every line of text 
        const margin = 10;
        let yPosition = 10;

        // For Desktop : yellow annotation on the top right corner only if geolocation are available/accepted
        if (!isMobile && (country !== "Non disponible" 
                        || city !== "Non disponible")) {
            const geolocationDetails = `
                Pays: ${country}
                Ville: ${city}
                Code postal: ${postcode}
                Rue: ${road}
            `.trim();

            const annotationWidth = 10;
            const annotationX = pageWidth - annotationWidth - 5;
            const annotationY = 5;

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
                open: true,
            });
        }

        // Header
        // pdf.setFont("helvetica", "normal");
        // Bold Font Size rules : H1=16, H2=13, P=10
        pdf.setFontSize(16);
        pdf.text("Preuve du tirage au sort - Ma Petite Loterie", 50, yPosition);
        yPosition += 10;

        // Line black rules = (1)
        pdf.setLineWidth(1);
        pdf.line(10, yPosition, pageWidth - 10, yPosition);
        yPosition += 10;

        pdf.setFontSize(13);
        pdf.text("Conditions :", 10, yPosition);

        // Calculate the width of the text to draw the underline (bold size 0.3 only)
        const underlineWidth1 = pdf.getTextWidth("Conditions :");
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

        // Draw loterry results
        pdf.setFontSize(13);
        pdf.text("Résultat du tirage au sort de la loterie :", 10, yPosition);

        // Calculate the width of the text to draw the underline (bold size 0.3 only)
        const underlineWidth2 = pdf.getTextWidth("Résultat du tirage au sort de la loterie :");
        pdf.setLineWidth(0.3);
        pdf.line(10, yPosition + 1, 10 + underlineWidth2, yPosition + 1);
        yPosition += 10;

        // List of winners : if there are too many => add a new page
        pdf.setFontSize(10);
        winners.forEach((winner, index) => {
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
        const dateText = `Date : ${date} et Heure : ${time}`;
        const textWidth = pdf.getTextWidth(dateText);
        pdf.text(dateText, (pageWidth - textWidth) / 2, yPosition);
        yPosition += 10;


        // For Mobile : display yellow annotation geolocation directly 
        if (isMobile && (road !== "Non disponible" 
                        || city !== "Non disponible" 
                        || country !== "Non disponible" 
                        || postcode !== "Non disponible")) {

            // New line
            pdf.setLineWidth(1);
            pdf.line(10, yPosition, pageWidth - 10, yPosition);
            yPosition += 10;

            // Line of geolocation
            pdf.setFontSize(13);
            pdf.setTextColor(0, 0, 0);
            pdf.text("Informations de localisation :", 10, yPosition);

            // Calculate the width of the text to draw the underline (bold size 0.3 only)
            const underlineWidth2 = pdf.getTextWidth("Informations de localisation :");
            pdf.setLineWidth(0.3);
            pdf.line(10, yPosition + 1, 10 + underlineWidth2, yPosition + 1);
            yPosition += 10;
        
            pdf.setFontSize(10);
            const geolocationText = `${road} ${postcode} ${city}, ${country}`;

            // Split if the text is too long
            const wrappedText = pdf.splitTextToSize(geolocationText, pageWidth - 20);

            pdf.text(wrappedText, 10, yPosition);
            // Add 6px for each lines for the next text
            yPosition += wrappedText.length * 6; 
        }


        // Download PDF
        // Format : DD_MM_YYYY_HH-MM-SS.pdf
        // pdf.save(`Resultat_Loterie_${date}_${time}.pdf`);
        // Format : DD_MM_YYYY _ HH H MM - SS s /pdf
        const safeDate = date.replace(/\//g, "_"); // "22_10_2025"
        const safeTime = time.replace(/^(\d{2}):(\d{2}):(\d{2})$/, "$1H$2-$3s");
        pdf.save(`Resultat_Loterie_${safeDate}_${safeTime}.pdf`);
        
    };


    // Attempt/ try to catch geolocation 
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                .then((response) => response.json())
                .then((data) => {
                    road = data.address.road || road;
                    city = data.address.city || data.address.town || data.address.village || city;
                    country = data.address.country || country;
                    postcode = data.address.postcode || postcode;
                })
                .catch((error) => console.error("Erreur lors de la récupération des données de géolocalisation :", error))
                .finally(() => generatePDFContent());
        },
        function () {
            console.warn("Localisation refusée par l'utilisateur.");
            generatePDFContent();
        }
    );
}
