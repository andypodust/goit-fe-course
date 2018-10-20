'use strict';

const getAllUsers = document.querySelector(".js-GetAllUsersBtn");
const result = document.querySelector(".result");
const getUserById = document.querySelector(".js-GetUserById");
const inputId = document.querySelector(".js-inputId")
const getUserByIdBtn = document.querySelector(".js-GetUserByIdBtn");
const removeUserBtn = document.querySelector(".js-removeUserBtn");
const removeUser = document.querySelector(".js-removeUser");
const addUser = document.querySelector(".js-addUser");
const addUserBtn = document.querySelector(".js-addUserBtn");
const inputName = document.querySelector(".js-inputName")
const inputAge = document.querySelector(".js-inputAge")
const updateUserBtn = document.querySelector(".js-updateUserBtn");
const updateUser = document.querySelector(".js-updateUser");

getAllUsers.addEventListener("submit", handleAllUsersBtn);

function fetchUserData(id, param){
  return fetch(`https://test-users-api.herokuapp.com/users/${id}`, param)
       .then(response => {
           if(response.ok) return response.json();
           throw new Error('error')
       }).catch(err => console.error(err));
};

function handleAllUsersBtn(ev) {
  ev.preventDefault();
  fetchUserData('').then(data => {
      const names = data.data.reduce((acc, el) => acc + `<tr> <td>${el.id}</td>    <td>${el.name}</td>  <td>${el.age}</td> </tr>`,'');
      result.firstElementChild.innerHTML = `<caption>All users</caption><tr><td>ID</td><td>NAME</td><td>AGE</td></tr>${names}`;
  });
};

getUserById.addEventListener("submit", handleGetUsersByIdBtn);

function handleGetUsersByIdBtn(ev) {
  ev.preventDefault();
  fetchUserData(inputId.value).then(data => {
    if(data.status !== 200) {
      return result.lastElementChild.insertAdjacentHTML('beforeend', `<p> Пользователь не найден!</p>`);
    }
    result.lastElementChild.insertAdjacentHTML('beforeend', `<p>Name: ${data.data.name} Age: ${data.data.age}</p>`)

  });
  getUserByIdBtn.parentNode.reset();
};

addUser.addEventListener("submit", handleAddUserBtn);

function handleAddUserBtn(ev) {
  ev.preventDefault();
  fetchUserData('', {method: 'POST',
      body: JSON.stringify({ name: inputName.value , age: Number(inputAge.value)}),
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }}).then(data => {
      if (data.status === 201) {
          return result.lastElementChild.insertAdjacentHTML('beforeend',`<p>Добавление пользователя прошло успешно!</p>`);
       }
  });
  inputName.parentNode.reset();
  inputAge.parentNode.reset();
};
removeUser.addEventListener("submit", hamdleRemoveUserBtn);

function handleRemoveUserBtn(ev) {
  ev.preventDefault();
  fetchUserData(inputId.value, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }}).then(data => {
          if (data.status !== 500) {
              return result.lastElementChild.insertAdjacentHTML('beforeend',`<p>Удаление пользователя прошло успешно!</p>`);
           } else {
              return result.lastElementChild.insertAdjacentHTML('beforeend',`<p>Ошибка!</p>`);
           }
  });
  inputId.parentNode.reset();
};

updateUser.addEventListener("submit", handleUdateUserBtn);

function handleUpdateUserBtn(evt) {
  evt.preventDefault();

  const inputId = updateUserBtn.previousElementSibling.previousElementSibling.previousElementSibling;
  const inputName = updateUserBtn.previousElementSibling.previousElementSibling;
  const inputAge = updateUserBtn.previousElementSibling;

  fetchUserData(inputId.value, {
      method: 'PUT',
      body: JSON.stringify({ name: inputName.value, age: Number(inputAge.value)}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
  }).then(data => {
      if (data.status === 200) {
          return result.lastElementChild.insertAdjacentHTML('beforeend',`<p>Изменение данных пользователя прошло успешно!</p>`);
       } else {
          return result.lastElementChild.insertAdjacentHTML('beforeend',`<p>Ошибка!</p>`);
       }
  });
  inputId.parentNode.reset();
  inputName.parentNode.reset();
  inputAge.parentNode.reset();
}
