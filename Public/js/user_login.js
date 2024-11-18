const regist = document.getElementById('regist');
const login_form = document.getElementById('login');
const submit_button = document.getElementById('submit_button');

const emailInput = document.getElementById('email');

const passwordInput = document.getElementById('password');

let isEmailValid = false;
let isPasswordValid = false;

regist.addEventListener('click', () => {
  window.location.href = '/api/v1/regist';
});

function validate() {
  const helperText = document.getElementById('helper_text');
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailValue === '') {
    helperText.textContent = '* 이메일을 입력하세요';
    helperText.classList.remove('hidden');
    isEmailValid = false;
  } else if (emailValue.length < 5) {
    helperText.textContent = '* 이메일이 너무 짧습니다.';
    helperText.classList.remove('hidden');
    isEmailValid = false;
  } else if (!emailRegex.test(emailValue)) {
    helperText.textContent = '* 유효하지 않은 이메일 입니다.';
    helperText.classList.remove('hidden');
    isEmailValid = false;
  } else {
    helperText.classList.add('hidden');
    isEmailValid = true;
  }

  if (passwordValue.length > 7) {
    isPasswordValid = true;
  } else {
    isPasswordValid = false;
  }

  if (isEmailValid && isPasswordValid) {
    submit_button.setAttribute('type', 'submit');
    submit_button.style.backgroundColor = '#7F6AEE';
  } else {
    submit_button.setAttribute('type', 'button');
    submit_button.style.backgroundColor = '#aca0eb';
  }
}

document.getElementById('email').addEventListener('input', validate);

document.getElementById('password').addEventListener('input', validate);

login_form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  // 데이터 서버로 전송
  const userData = {
    email: emailValue,
    password: passwordValue,
  };

  try {
    const response = await axios.post('/api/v1/login', userData);
    alert('로그인 성공');
    window.location.href = '/api/v1/post/list';
  } catch (error) {
    console.error(error);
    alert('로그인 실패');
  }
});
