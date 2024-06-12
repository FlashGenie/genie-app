import jwtFetch from "./jwt";

export const uploadPDF = async (pdfFile) => { 
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    const response = await jwtFetch('/api/upload', {
          method: 'POST',
          body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload file');
    }

    return await response.json();
}

export const generateFlashcards = async (parsedText) => {
    const response = await jwtFetch('/api/generateFlashcard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parsedText })
    });

    if (!response.ok) {
        throw new Error('Failed to generate flashcards');
    }

    const data = await response.json();
    return data.flashcardObject;
};

export const createDeck = async (name, category, cards) => {
    const response = await jwtFetch('/api/decks/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, category, cards })
    });

    if (!response.ok) {
        throw new Error('Failed to create deck');
    }

    const data = await response.json();
    return data;
};