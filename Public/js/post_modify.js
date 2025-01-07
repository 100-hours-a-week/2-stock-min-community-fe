const title = document.getElementById('title');
const content = document.getElementById('content');
const postIMG = document.getElementById('fileInput');
const modifyForm = document.getElementById('post_write');
const submitButton = document.getElementById('submit_button');
const currentLocation = window.location.pathname;
const postID = parseInt(currentLocation.split('/').pop());

const backButton = document.getElementById('logo_back');

backButton.addEventListener('click', () => {
  window.location.href = `/posts/${postID}`;
});
viewPostModify();
async function viewPostModify() {
  const postInfo = await axios.get(`${serverURL}/posts/content/${postID}`, {
    withCredentials: 'include',
  });
  inputs.title.value = postInfo.data[0].title;
  inputs.content.value = postInfo.data[0].content;
  validateField('title', inputs.title.value);
  validateField('content', inputs.content.value);
}

const validateRules = {
  title: (value) => {
    if (!value) return '* 제목을 입력해주세요';
    if (value.length > 26) return '* 26자 이하로 적어주세요';
  },
  content: (value) => {
    if (!value) return '* 내용을 적어주세요';
  },
};
const isValid = {
  title: false,
  content: false,
};
const inputs = {
  title: document.getElementById('title'),
  content: document.getElementById('content'),
};

const helper_text = document.getElementById('helper_post');

function validateField(field, value) {
  const errorMessage = validateRules[field](value);
  if (!errorMessage) {
    isValid[field] = true;
  } else {
    isValid[field] = false;
  }
  if (isValid.title && isValid.content) {
    submitButton.style.backgroundColor = '#6d94ff';
    submitButton.setAttribute('type', 'submit');
  } else {
    submitButton.style.backgroundColor = '#baccff';
    submitButton.setAttribute('type', 'button');
  }
  helper_text.textContent = errorMessage;
  helper_text.classList.toggle('hidden', !errorMessage);
}

inputs.title.addEventListener('input', () => {
  validateField('title', inputs.title.value);
});
inputs.content.addEventListener('input', () => {
  validateField('content', inputs.content.value);
});
submitButton.addEventListener('click', () => {
  if (!isValid.title || !isValid.content) {
    helper_text.innerText = '* 제목, 내용을 모두 작성해주세요';
    helper_text.classList.remove('hidden');
  }
});

modifyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData();

  formData.append('postID', postID);
  formData.append('title', title.value);
  formData.append('content', content.value);
  formData.append('postIMG', postIMG.files[0]);
  const response = await axios.patch(`${serverURL}/posts/${postID}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  window.location.href = `/posts/${postID}`;
});
