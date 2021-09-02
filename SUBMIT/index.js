const formElem = document.getElementById("submit-form");
const formInputElems = document.querySelectorAll("input");
const mainFormElem = document.querySelector(".mainForm");
const messageElem = document.querySelector(".message");

async function submitData() {
	const formData = {};
	formInputElems.forEach(input => {
		if (['text','email','password'].includes(input.type)) {
			formData[input.id] = input.value;
		} else {
			formData[input.id] = input.checked;
		}
	});
	const jsonFormData = JSON.stringify(formData);

	const settings = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: jsonFormData
	}
	console.log('sending form');
	const res = await fetch(`http://localhost:6012/processform`, settings);
	const data = await res.json();
	return data;
}

const showMessage = (message) => {
	mainFormElem.style.display = 'none';
	messageElem.style.display = 'block';
	messageElem.innerHTML = message;
};

formElem.addEventListener("submit", function (event) {
	event.preventDefault();
	submitData().then(data => showMessage(`Thank you for submitting your details. 
Your user id is: ${data.id}`));
});