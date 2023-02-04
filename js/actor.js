const noticeEl = document.querySelector('.notice');
const filmsContainerEl = document.querySelector('.films-container');

document.addEventListener('DOMContentLoaded', () => {
  const actorId = sessionStorage.getItem('actorId');
  filmsContainerEl.innerHTML = '';
  fetch(actorId).then((res) => res.json()).then((data) => {
    const movies = data.films;

    movies.forEach((mov) => {
      let movOutput = '';
      fetch(mov).then((movRes) => movRes.json()).then((movData) => {
        movOutput = `
          <div class="film">
            <p><strong>Title:</strong> ${movData.title}</p>
            <p><strong>Episode:</strong> ${movData.episode_id}</p>
            <p><strong>Story:</strong> ${movData.opening_crawl}</p>
          </div>`;
        filmsContainerEl.insertAdjacentHTML('beforeend', movOutput);
      }).catch(() => {
        filmsContainerEl.insertAdjacentHTML('beforeend', '<h2>An error occurred</h2>');
      });
    });
    const output = `<p>${data.name} appeared in movies: </p>`;
    noticeEl.innerHTML = output;
  }).catch(() => {
    noticeEl.innerHTML = '<p>Please try again later</p>';
  });
});