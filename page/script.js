document.getElementById('fetchData').addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3000/apisMortyOnePiece');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
  
      document.getElementById('res').style.display = 'flex';

      const onePiece = data.onePiece;
      document.getElementById('one-piece-image').src = onePiece.image;
      document.getElementById('one-piece-name').textContent = `Name: ${onePiece.name}`;
      document.getElementById('one-piece-status').textContent = `Status: ${onePiece.status}`;
      document.getElementById('one-piece-age').textContent = `Age: ${onePiece.age}`;
  
      // Actualizar la información de Rick and Morty
      const rickAndMorty = data.rickAndMorty;
      document.getElementById('rick-and-morty-image').src = rickAndMorty.image;
      document.getElementById('rick-and-morty-name').textContent = `Name: ${rickAndMorty.name}`;
      document.getElementById('rick-and-morty-status').textContent = `Status: ${rickAndMorty.status}`;
      document.getElementById('rick-and-morty-species').textContent = `Species: ${rickAndMorty.species}`;
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  