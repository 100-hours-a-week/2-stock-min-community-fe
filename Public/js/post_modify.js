const title = document.getElementById('title');
const content = document.getElementById('content');
const postIMG = document.getElementById('fileInput');
const modifyForm = document.getElementById('post_write');
const submitButton = document.getElementById('submit_button');
const currentLocation = window.location.pathname;
const postID = parseInt(currentLocation.split('/').pop());

const backButton = document.getElementById('logo_back');

backButton.addEventListener('click', () => {
  window.location.href = `/api/v1/posts/${postID}`;
});

function validate() {
  if (!title.value) {
    submitButton.style.backgroundColor = '#aca0eb';
    submitButton.setAttribute('type', 'button');
  } else if (!content.value) {
    submitButton.style.backgroundColor = '#aca0eb';
    submitButton.setAttribute('type', 'button');
  } else {
    submitButton.style.backgroundColor = '#7F6AEE';
    submitButton.setAttribute('type', 'submit');
  }
}
title.addEventListener('input', validate);
content.addEventListener('input', validate);
modifyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('postID', postID);
  formData.append('title', title.value);
  formData.append('content', content.value);
  formData.append('postIMG', postIMG.files[0]);
  const response = await axios.patch(`/api/v1/posts/${postID}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
});
