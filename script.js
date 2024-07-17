document.getElementById('animeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const animeTitle = document.getElementById('animeInput').value.trim();
    if (!animeTitle) {
        alert('Please enter an anime title.');
        return;
    }

    const apiUrl = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(animeTitle)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayAnime(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch anime data. Please try again.');
        });
});

function displayAnime(data) {
    const animeDisplay = document.getElementById('animeDisplay');
    animeDisplay.innerHTML = '';

    if (data.data.length === 0) {
        animeDisplay.innerHTML = '<p>No anime found with that title.</p>';
        return;
    }

    const anime = data.data[0]; // Display the first result

    const coverImage = anime.attributes.posterImage ? anime.attributes.posterImage.medium : 'https://via.placeholder.com/150';
    
    animeDisplay.innerHTML = `
        <div class="anime-card">
            <h2>${anime.attributes.canonicalTitle}</h2>
            <img src="${coverImage}" alt="Cover Image">
            <p>Synopsis: ${anime.attributes.synopsis || 'Not available'}</p>
        </div>
    `;
}
