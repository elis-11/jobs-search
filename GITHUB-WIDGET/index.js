const formApi = document.querySelector('.formApi');
const inputEl = document.querySelector('.input');
const btn = document.querySelector('.btn');
const urlRepositEl = document.querySelector('.urlReposit');

const githubInfo = async () => {
  const apiUrl = 'https://api.github.com/users';
  const fetchUrl = `${apiUrl}/${inputEl.value}/repos`;
  const responseData = await fetch(fetchUrl);
  const jsonData = await responseData.json();
  urlRepositEl.innerHTML = jsonData
    .map((repo) => {
    //   return `<li>${repo.name}</li>
    //   <li>  ${repo.description === null ? '' : repo.description}</li> `;
      return `<li>${repo.name.charAt(0).toUpperCase() + repo.name.slice(1)}</li>`
    })
    .join('');
};
formApi.addEventListener('submit', async (event) => {
  event.preventDefault();
  githubInfo();
});