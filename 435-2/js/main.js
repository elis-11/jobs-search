const apiUrl = "https://api.cryptonator.com/api/ticker";

const form = document.querySelector("#conversion-form");

const sourceCurrencyElem = document.querySelector("#sourceCurrency");
const sourceAmountElem= document.querySelector("#sourceAmount");

const targetCurrencyElem = document.querySelector("#targetCurrency");
const targetAmountElem = document.querySelector("#targetAmount");

const registerEvents = async () => {
	let res = await fetch(`${apiUrl}/${sourceCurrencyElem.value}-${targetCurrencyElem.value}`)
	let data = await res.json()
	targetAmountElem.value = (data.ticker.price * sourceAmountElem.value).toFixed(2)
}

form.addEventListener("submit", e => {
	e.preventDefault();
	registerEvents()
})