const galleryItems = [
  { preview: 'img/1.jpeg', fullview: 'img/1F.jpeg', alt: "alt text 1" },
  { preview: 'img/2.jpeg', fullview: 'img/2F.jpeg', alt: "alt text 2" },
  { preview: 'img/3.jpeg', fullview: 'img/3F.jpeg', alt: "alt text 3" },
  { preview: 'img/4.jpeg', fullview: 'img/4F.jpeg', alt: "alt text 4" },
  { preview: 'img/5.jpeg', fullview: 'img/5F.jpeg', alt: "alt text 5" },
  { preview: 'img/6.jpeg', fullview: 'img/6F.jpeg', alt: "alt text 6" },
];

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.js-image-gallery')

  const createFullView = ({fullview, alt}) => {
    return `<div class="fullview">
    <img src="${fullview}" alt="${alt}" class="fullImg" width=1280 height=auto>
    </div>`
  };

  const previewLi = galleryItems.reduce((acc, {preview, fullview, alt}) => acc + `<li><img src="${preview}" class="image" data-fullview="${fullview}" alt="${alt}" width=220 height=auto></li>`, '');

  const createPreview = () => {
    return `<ul class="preview">${previewLi}</ul>`
  };

  gallery.insertAdjacentHTML("afterbegin" , createPreview());
  gallery.insertAdjacentHTML("afterbegin", createFullView(galleryItems[0]));

  const previewImg = document.querySelector('.image');
  previewImg.classList.add('clickElem');

  const handleImgClick = (event) => {
    event.preventDefault();

    if (event.target.nodeName !== 'IMG') return;
    
    const fullImg = gallery.querySelector('.fullImg');
    const datasetFullview = event.target.dataset.fullview;
    const altFullview = event.target.alt;
    
    fullImg.setAttribute('src', datasetFullview);
    fullImg.setAttribute('alt', altFullview);

    const clickElem = gallery.querySelector('.image.clickElem');
    clickElem.classList.remove('clickElem');
    
    event.target.classList.add('clickElem');
  };

  gallery.lastElementChild.addEventListener('click', handleImgClick);
})