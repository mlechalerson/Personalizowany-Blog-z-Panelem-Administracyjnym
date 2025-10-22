const postForm = document.getElementById('post-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const imageInput = document.getElementById('image');
const postsList = document.getElementById('posts-ul');

function addPost(title, content, image) {
  const newPost = document.createElement('li');
  newPost.classList.add('post-item');

  if (image && isValidUrl(image)) {
    newPost.innerHTML = `
      <h3>${title}</h3>
      <img src="${image}" alt="${title}" style="max-width: 100%; height: auto;"/>
      <p>${content}</p>
    `;
  } else {
    newPost.innerHTML = `
      <h3>${title}</h3>
      <p>${content}</p>
      <p><i>Brak obrazka - proszę wprowadzić poprawny URL</i></p>
    `;
  }

  postsList.appendChild(newPost);
}

function isValidUrl(url) {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
}

postForm.addEventListener('submit', function (e) {
  e.preventDefault(); 

  const title = titleInput.value;
  const content = contentInput.value;
  const image = imageInput.value;

  if (title && content && image) {
    addPost(title, content, image);

    titleInput.value = '';
    contentInput.value = '';
    imageInput.value = '';
  } else {
    alert('Proszę uzupełnić wszystkie pola.');
  }
});
