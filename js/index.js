const BASE_URL = 'https://swapi.dev/api/';

const navLinksEl = document.querySelector('.nav-links');
const navLinkEl = document.querySelectorAll('.nav-link');
const sectionEl = document.querySelectorAll('.section');
const actorsContainerEl = document.querySelector('.actors-container');

document.addEventListener('DOMContentLoaded', () => {
  fetch(`${BASE_URL}people`).then((res) => res.json()).then(({ results }) => {
    actorsContainerEl.innerHTML = '';

    results.forEach((actor) => {
      const output = `
        <div class="actor">
          <p class="actor-name">Name: ${actor.name}</p>
          <p>Height: ${actor.height} cm</p>
          <p>Weight: ${actor.mass} kg</p>
          <p>Birth Year: ${actor.birth_year}</p>
          <a onclick="actorSelected('${actor.url}')" href="#">See movies</a>
        </div>`;
      actorsContainerEl.insertAdjacentHTML('beforeend', output);
    });
  }).catch(() => {
    actorsContainerEl.innerHTML = '<h2>We ran into issues, please try again later</h2>';
  });
});

const actorSelected = (url) => {
  sessionStorage.setItem('actorId', url);
  window.location = 'actor.html';
  return false;
};

navLinksEl.addEventListener('click', (e) => {
  const clicked = e.target;
  if (!clicked.classList.contains('nav-link')) return;

  const { sect } = clicked.dataset;
  navLinkEl.forEach((link) => link.classList.remove('nav-link--active'));
  clicked.classList.add('nav-link--active');

  sectionEl.forEach((link) => link.classList.remove('section--active'));

  document.querySelector(`.section-${sect}`).classList.add('section--active');
});