const regist = document.getElementById('regist');
const login_form = document.getElementById('login');
const submit_button = document.getElementById('submit_button');

const emailInput = document.getElementById('email');

const passwordInput = document.getElementById('password');

let isEmailValid = false;
let isPasswordValid = false;

regist.addEventListener('click', () => {
  window.location.href = '/user/regist';
});

function validate() {
  const helperText = document.getElementById('helper_text');
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  if (!emailValue) {
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
  } else if (!passwordValue) {
    helperText.textContent = '* 비밀번호를 입력해주세요';
    isPasswordValid = false;
  } else if (!passwordRegex.test(passwordValue)) {
    helperText.textContent =
      '* 비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    isPasswordValid = false;
  } else {
    helperText.classList.add('hidden');
    isEmailValid = true;
    isPasswordValid = true;
  }

  // if (!passwordValue) {
  //   helperText.textContent = '* 비밀번호를 입력해주세요';
  //   isPasswordValid = false;
  // } else if (!passwordRegex.test(passwordValue)) {
  //   helperText.textContent =
  //     '* 비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.';
  //   isPasswordValid = false;
  // } else {
  //   isPasswordValid = true;
  // }

  if (isEmailValid && isPasswordValid) {
    submit_button.setAttribute('type', 'submit');
    submit_button.style.backgroundColor = '#6d94ff';
  } else {
    submit_button.setAttribute('type', 'button');
    submit_button.style.backgroundColor = '#baccff';
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
    const response = await axios.post(`${serverURL}/login`, userData, {
      withCredentials: 'true',
    });
    alert('로그인 성공');
    window.location.href = `/posts/list`;
  } catch (error) {
    console.error(error);
    alert('로그인 실패');
  }
});
