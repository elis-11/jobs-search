import jsonData from './data.js';

const data = JSON.parse(jsonData);
const containerElem = document.querySelector('.container');
const searchTextElem = document.querySelector('.searchText');

searchTextElem.onkeyup = (e) => {
	containerElem.innerHTML = getHtml(searchTextElem.value);
}

// const content = data.map(job => {
// 	const bulkSearch = job.title + '|' + job.skills;
// 	if (bulkSearch.toLowerCase().includes(searchText.value)) {
// 		// if (job.toLowerCase().includes(searchText.value)) {
// 		return `
// 	<div class="title"><a href="${job.url}">${job.title}</a></div>
// 	<div class="skills">${job.skills}</div>
// 	`;
// 	}
// }).filter(m => m != undefined).join('');

const getHtml = (lookupText = '') => {
	let content = '';
	data.forEach(job => {
		const bulkSearch = job.title + '|' + job.skills;
		if (bulkSearch.toLowerCase().includes(lookupText)) {
			content += `
	<div class="title"><a href="${job.url}">${job.title}</a></div>
	<div class="skills">${job.skills}</div>
	`;
		}
	});
	return content;
}

containerElem.innerHTML = getHtml();