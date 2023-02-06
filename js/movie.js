const noticeEl = document.querySelector('.notice');
const actorsContainerEl = document.querySelector('.actors-container');

document.addEventListener('DOMContentLoaded', () => {
  const movieId = sessionStorage.getItem('movieId');
  actorsContainerEl.innerHTML = '';
  fetch(movieId).then((res) => res.json()).then((data) => {
    const { characters } = data;

    characters.forEach((character) => {
      let charOutput = '';
      fetch(character).then((charRes) => charRes.json()).then((charData) => {
        charOutput = `
          <div class="actor">
            <p>Name: ${charData.name}</p>
            <p>Height: ${charData.height} cm</p>
            <p>Weight: ${charData.mass} kg</p>
            <p>Birth Year: ${charData.birth_year}</p>
          </div>`;
        actorsContainerEl.insertAdjacentHTML('beforeend', charOutput);
      }).catch(() => {
        actorsContainerEl.insertAdjacentHTML('beforeend', '<h2>An error occurred</h2>');
      });
    });
    const output = `<p>${data.title} characters: </p>`;
    noticeEl.innerHTML = output;
  }).catch(() => {
    noticeEl.innerHTML = '<p>Please try again later</p>';
  });
});