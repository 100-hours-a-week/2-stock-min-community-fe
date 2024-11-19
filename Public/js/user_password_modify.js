const validationRules = {
  password: (value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!value) return '비밀번호를 입력하세요';
    if (!passwordRegex.test(value))
      return '비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    return '';
  },
  passwordCheck: (value, passwordValue) => {
    if (value !== passwordValue) return '비밀번호가 일치하지 않습니다.';
    return '';
  },
};

const inputs = {
  password: document.getElementById('password'),
  passwordCheck: document.getElementById('password_check'),
};
const helperTexts = {
  password: document.getElementById('helper_password'),
  passwordCheck: document.getElementById('helper_password_check'),
};
const isValid = {
  password: false,
  passwordCheck: false,
};

function validateField(field, value, additionalValue = null) {
  const submit_button = document.getElementById('submit_button');
  const errorMessage = validationRules[field](value, additionalValue);
  console.log(field);
  console.log(helperTexts[field]);
  if (!errorMessage) {
    isValid[field] = true;
  } else {
    isValid[field] = false;
  }
  if (isValid.password && isValid.passwordCheck) {
    submit_button.style.backgroundColor = '#7F6AEE';
    submit_button.setAttribute('type', 'submit');
  } else {
    submit_button.style.backgroundColor = '#aca0eb';
    submit_button.setAttribute('type', 'button');
  }
  helperTexts[field].textContent = errorMessage;
  helperTexts[field].classList.toggle('hidden', !errorMessage);
}

inputs.password.addEventListener('input', () => {
  validateField('password', inputs.password.value);
});
inputs.passwordCheck.addEventListener('input', () => {
  validateField(
    'passwordCheck',
    inputs.passwordCheck.value,
    inputs.password.value
  );
});

document.getElementById('patch_form').addEventListener('submit', async () => {
  const passwordValue = inputs.password.value;
  const patchList = {
    data: passwordValue,
    field: 'password',
  };
  try {
    const response = await axios.patch('/api/v1/user', patchList);
  } catch (error) {
    console.error(error);
    alert('Error');
  }
});
