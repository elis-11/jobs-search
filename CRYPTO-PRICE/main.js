const formEl = document.querySelector('#crypto-form');
const cryptoTypeEl = document.querySelector('#crypto-type');
const cryptoValueEl = document.querySelector('#crypto-value');
const moneyTypeEl = document.querySelector('#money-type');
const resultOutputEl = document.querySelector('#result-output');

const convertType = async () => {
  const apiURL = 'https://api.cryptonator.com/api/ticker';
  const fetchURL = `${apiURL}/${cryptoTypeEl.value}-${moneyTypeEl.value}`;
  const response = await fetch(fetchURL);
  const jsonData = await response.json();
  const resultValue = (jsonData.ticker.price * cryptoValueEl.value).toFixed(2);
  resultOutputEl.value = resultValue;

};

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  convertType();
});
console.log(formEl);
