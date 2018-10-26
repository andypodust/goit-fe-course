"use strict";

var refs = {
  template: document.querySelector('.js-template'),
  listCards: document.querySelector('.js-list-cards'),
  input: document.querySelector('.js-form input[type=text]'),
  form: document.querySelector('.js-form')
};
var source = refs.template.innerHTML.trim();
var temp = Handlebars.compile(source);
Object.keys(localStorage).forEach(function (element) {
  fetch("https://api.linkpreview.net/?key=5bd2bd1e159d4b2a003a3ba33eb6c33b918a0ef915a13=".concat(element)).then(function (response) {
    if (response.ok) return response.json();
  }).then(function (data) {
    refs.listCards.insertAdjacentHTML('afterbegin', temp(data));
  }).catch(function (err) {
    return console.error(err);
  });
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  var regUrl = /^((ftp|http|https):\/\/)?(www\.|)([A-z|0-9]+)\.([A-z]{2,})/;

  if (!regUrl.test(refs.input.value)) {
    refs.input.parentNode.reset();
    return alert('Невалидный URL! Попробуйте еще раз.');
  }

  fetch("https://api.linkpreview.net/?key=5bd2bd1e159d4b2a003a3ba33eb6c33b918a0ef915a13=".concat(refs.input.value)).then(function (response) {
    if (response.ok) return response.json();
  }).then(function (data) {
    if (localStorage.getItem(data.url) !== null) return alert('Такая закладка уже есть!');
    localStorage.setItem(data.url, data.url);
    var markup = temp(data);
    refs.listCards.insertAdjacentHTML('afterbegin', markup);
  }).catch(function (err) {
    return console.error(err);
  });
  ;
  ;
  refs.input.parentNode.reset();
}

function handleDelBtn(e) {
  e.preventDefault();
  var liUrl = document.querySelector('.js-li-url');
  if (e.target.nodeName !== "BUTTON") return;
  localStorage.removeItem(liUrl.name);
  e.target.parentElement.parentElement.remove();
}

refs.form.addEventListener('submit', handleFormSubmit);
refs.listCards.addEventListener('click', handleDelBtn);