const express = require('express');
const cors = require('cors');
const FormData = require('form-data');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/apisMortyOnePiece', async (req, res) => {
  try {
    // Importación dinámica de node-fetch
    const fetch = (await import('node-fetch')).default;

    // Petición a la API de One Piece
    const form = new FormData();
    form.append('characterId', '1');

    const onePieceResponse = await fetch('https://one-piece2.p.rapidapi.com/api/get-character-data', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'dcae1b7554mshb384be3e6b3d740p1121bfjsnc2562fe727bd',
        'x-rapidapi-host': 'one-piece2.p.rapidapi.com',
        token: 'ab84ad27eb9fe47b625069a7f0a4833fb92439639d9a57f7a56ca60bc4a8fbc6',
        ...form.getHeaders()
      },
      body: form
    });

    if (!onePieceResponse.ok) {
      throw new Error('Error fetching One Piece API');
    }

    const onePieceData = await onePieceResponse.json();

    // Petición a la API de Rick and Morty
    const rickAndMortyResponse = await fetch('https://rickandmortyapi.com/api/character/2');

    if (!rickAndMortyResponse.ok) {
      throw new Error('Error fetching Rick and Morty API');
    }

    const rickAndMortyData = await rickAndMortyResponse.json();

    // Combinación de las respuestas
    const combinedData = {
      onePiece: onePieceData,
      rickAndMorty: rickAndMortyData
    };

    // Enviar la respuesta combinada al frontend
    res.json(combinedData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data from APIs' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
