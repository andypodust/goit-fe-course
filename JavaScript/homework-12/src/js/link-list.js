const refs = {
     template: document.querySelector('.js-template'),
     listCards: document.querySelector('.js-list-cards'),
     input: document.querySelector('.js-form input[type=text]'),
     form: document.querySelector('.js-form')

};

const source = refs.template.innerHTML.trim();
const temp = Handlebars.compile(source);


Object.keys(localStorage).forEach(element => {
    fetch(`https://api.linkpreview.net/?key=5bd2be4683f4df4868c2be896cecac30712acbad1b051&q=${element}`)
	.then(response => {
		if(response.ok) return response.json();
    })
    .then(data => {
		refs.listCards.insertAdjacentHTML('afterbegin', temp(data));
    })
    .catch(err => console.error(err));
});


function handleFormSubmit(evt) {
	evt.preventDefault();
    
    const regUrl = /^((ftp|http|https):\/\/)?(www\.|)([A-z|0-9]+)\.([A-z]{2,})/;

	if(!regUrl.test(refs.input.value)) {
		refs.input.parentNode.reset();
		return alert('Невалидный URL! Попробуйте еще раз.');
	} 

    
    fetch(`https://api.linkpreview.net/?key=5bd2be4683f4df4868c2be896cecac30712acbad1b051&q=${refs.input.value}`)
	.then(response => {
		if(response.ok) return response.json();
    })
    .then(data => {
		if(localStorage.getItem(data.url) !== null) return alert('Такая закладка уже есть!')
		localStorage.setItem(data.url, data.url)
		const markup = temp(data)
		refs.listCards.insertAdjacentHTML('afterbegin', markup);
    })
    .catch(err => console.error(err));;	;

	refs.input.parentNode.reset();
}

function handleDelBtn(e) {
	e.preventDefault();

	const liUrl = document.querySelector('.js-li-url');

	if (e.target.nodeName !== "BUTTON") return;

	localStorage.removeItem(liUrl.name);

	e.target.parentElement.parentElement.remove();	
}

refs.form.addEventListener('submit', handleFormSubmit);
refs.listCards.addEventListener('click', handleDelBtn)
