'use strict';

const getAllUsers = document.querySelector(".js-GetAllUsers");
const result = document.querySelector(".result");
const getUserById = document.querySelector(".js-GetUserById");
const getUserByIdBtn = document.querySelector("#js-GetUserById");
const removeUserBtn = document.querySelector("#js-removeUser");
const removeUser = document.querySelector(".js-removeUser");
const addUser = document.querySelector(".js-addUser");
const addUserBtn = document.querySelector("#js-addUser");
const updateUserBtn = document.querySelector("#js-updateUser");
const updateUser = document.querySelector(".js-updateUser");

getAllUsers.addEventListener("submit", handleAllUsersBtn);
getUserById.addEventListener("submit", handleGetUsersByIdBtn);
removeUser.addEventListener("submit", hamdleRemoveUserBtn);
addUser.addEventListener("submit", handleAddUserBtn);
updateUser.addEventListener("submit", handleUdateUserBtn);

function fetchUserData(id, param) {
  return fetch(`https://test-users-api.herokuapp.com/users/${id}`, param)
  .then(response => {
      if(response.ok) return response.json();
      throw new Error('error')
  })
  .catch(error => console.error(error));
};

function handleAddUserBtn(ev) {
  ev.preventDefault();
  fetchUserData('').then(data => {
    const names = data.data.reduce((acc, el) => acc + `<tr> <td>${el.id}</td>    <td>${el.name}</td>  <td>${el.age}</td> </tr>`,'');
    result.firstElementChild.innerHTML = `<caption>All users</caption><tr><td>ID</td><td>NAME</td><td>AGE</td></tr>${names}`;
});
};

function handleGetUsersByIdBtn(ev) {
  ev.preventDefault();
  const inputId = getUserByIdBtn.previousElementSibling;
  fetchUserData(inputId.value).then(data => {
    if(data.status !== 200) {
      return result.lastElementChild.insertAdjacentHTML('beforeend', `<p> Пользователь не найден!</p>`);
    }
    result.lastElementChild.insertAdjacentHTML('beforeend', `<p>Name: ${data.data.name} Age: ${data.data.age}</p>`)

  });
  getUserByIdBtn.parentNode.reset();

}
