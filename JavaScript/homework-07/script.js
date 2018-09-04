/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

const createPic = img => {
  const pic = document.createElement('img');
  pic.classList.add('post__image');
  pic.src = img;
  pic.alt = 'post image';

  return pic;
}

const createHeader = title => {
  const header = document.createElement('h2');
  header.classList.add('post__title');
  header.textContent = title;

  return header;
}

const createTextCont = text => {
  const textCont = document.createElement('p');
  textCont.classList.add('post__text');
  textCont.textContent = text;

  return textCont;
}

const createButton = link => {
  const buttonLink = document.createElement('a');
  buttonLink.classList.add('button');
  buttonLink.href = link;
  buttonLink.textContent = 'Read more';

  return buttonLink
}

const createPostCards = ({img, title, text, link}) => {
  const postCard = document.createElement('div');
  postCard.classList.add('post');

  postCard.append(createPic(img), createHeader(title), createTextCont(text), createButton(link));
  return postCard;
}


const createCard = posts => {
  return posts.map(post => createPostCards(post));
}

const cards = createCard(posts);
document.querySelector('.cards').append(...cards);

