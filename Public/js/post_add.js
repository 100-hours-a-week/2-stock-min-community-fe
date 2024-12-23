function getCurrentTime() {
  const now = new Date();

  // 각 시간 요소를 얻고 두 자리로 맞춤
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 원하는 형식으로 조합
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const submitButton = document.getElementById('submit_button');
const validateRules = {
  title: (value) => {
    if (!value) return '제목을 입력해주세요';
    if (value.length > 26) return '26자 이하로 적어주세요';
  },
  content: (value) => {
    if (!value) return '내용을 적어주세요';
  },
};
const backButton = document.getElementById('logo_back');
backButton.addEventListener('click', () => {
  window.location.href = '/posts/list';
});
const isValid = {
  title: false,
  content: false,
};
const inputs = {
  image: document.getElementById('fileInput'),
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
    submitButton.style.backgroundColor = '#7F6AEE';
    submitButton.setAttribute('type', 'submit');
  } else {
    submitButton.style.backgroundColor = '#aca0eb';
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

document
  .getElementById('post_form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();
    const postData = new FormData();

    postData.append('postImage', inputs.image.files[0]);
    postData.append('title', inputs.title.value);
    postData.append('content', content.value);
    postData.append('postDate', getCurrentTime());

    try {
      const response = await axios.post(`${serverURL}/posts`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: 'include',
      });
      alert('게시글 등록 성공');
      window.location.href = '/posts/list';
    } catch (error) {
      console.error('데이터 전송 실패 : ', error);
    }
  });
