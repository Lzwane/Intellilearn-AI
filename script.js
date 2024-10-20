
const pdfInput = document.getElementById('pdfInput');
const uploadButton = document.getElementById('uploadButton');
const summaryText = document.getElementById('summaryText');

uploadButton.addEventListener('click', () => {
    const file = pdfInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const pdfData = new Uint8Array(e.target.result);
            extractPDFText(pdfData);
        };

        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a PDF file.');
    }
});

function extractPDFText(pdfData) {
    pdfjsLib.getDocument(pdfData).promise.then(pdf => {
        let extractedText = '';
        let pagesPromises = [];

        for (let i = 1; i <= pdf.numPages; i++) {
            pagesPromises.push(
                pdf.getPage(i).then(page => {
                    return page.getTextContent().then(textContent => {
                        return textContent.items.map(item => item.str).join(' ');
                    });
                })
            );
        }

        Promise.all(pagesPromises).then(pagesText => {
            extractedText = pagesText.join(' ');
            summarizeText(extractedText);  // Summarize the extracted text
        });
    });
}

function summarizeText(text) {
    // Basic summary example using a slice (you can implement NLP models here)
    let summary = text.split(' ').slice(0, 150).join(' ') + '...';
    
    summaryText.textContent = summary;
}
