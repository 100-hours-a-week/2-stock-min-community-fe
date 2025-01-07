const login = document.getElementById('go_login');
const back = document.getElementById('logo_back');

function openFileDialog() {
  document.getElementById('fileInput').click();
}
login.addEventListener('click', () => {
  window.location.href = '/user/login';
});
back.addEventListener('click', () => {
  window.location.href = '/user/login';
});
const validationRules = {
  profile: (value) => {
    if (!value) return '* 프로필 사진을 넣어주세요';
    return '';
  },
  email: async (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return '* 이메일을 입력하세요.';
    if (!emailRegex.test(value)) return '* 유효하지 않은 이메일 형식입니다.';
    if (value.length < 5) return '* 이메일이 너무 짧습니다.';

    // 서버로 이메일 중복 확인 요청

    const response = await axios.post(`${serverURL}/check-duplicated`, {
      data: value,
      field: 'email',
    });
    if (response.data.duplicated) {
      return '* 이미 사용 중인 이메일입니다.';
    }

    return ''; // 유효하면 빈 문자열 반환
  },
  password: (value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    if (!value) return '* 비밀번호를 입력하세요.';
    if (!passwordRegex.test(value))
      return '* 비밀번호는 8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.';
    return '';
  },
  passwordCheck: (value, passwordValue) => {
    if (!value) return '* 비밀번호를 다시 입력해주세요';
    if (value !== passwordValue) return '* 비밀번호가 일치하지 않습니다.';
    return '';
  },
  nickname: async (value) => {
    if (!value) return '* 닉네임을 입력하세요.';
    if (value.length > 10) return '* 닉네임은 최대 10자까지 적을 수 있습니다';
    if (/\s/.test(value)) return '* 닉네임에 공백을 포함할 수 없습니다.';

    //닉네임 중복 확인 요청
    const response = await axios.post(`${serverURL}/check-duplicated`, {
      data: value,
      field: 'nickname',
    });
    if (response.data.duplicated) {
      return '* 이미 사용 중인 닉네임입니다.';
    }
    return '';
  },
};

const isValid = {
  profile: false,
  email: false,
  password: false,
  passwordCheck: false,
  nickname: false,
};

const inputs = {
  profile: document.getElementById('fileInput'),
  email: document.getElementById('email'),
  password: document.getElementById('password'),
  passwordCheck: document.getElementById('password_check'),
  nickname: document.getElementById('nickname'),
};

const helperTexts = {
  profile: document.getElementById('helper_text_profile'),
  email: document.getElementById('helper_text_email'),
  password: document.getElementById('helper_text_password'),
  passwordCheck: document.getElementById('helper_text_password_check'),
  nickname: document.getElementById('helper_text_nickname'),
};

// 유효성 검사 및 helper_text 업데이트 함수
async function validateField(field, value, additionalValue = null) {
  const submit_button = document.getElementById('submit_button');
  const errorMessage = await validationRules[field](value, additionalValue);
  if (!errorMessage) {
    isValid[field] = true;
  } else {
    isValid[field] = false;
  }
  if (
    isValid.email &&
    isValid.password &&
    isValid.passwordCheck &&
    isValid.nickname &&
    isValid.profile
  ) {
    submit_button.style.backgroundColor = '#6d94ff';
    submit_button.setAttribute('type', 'submit');
  } else {
    submit_button.style.backgroundColor = '#baccff';
    submit_button.setAttribute('type', 'button');
  }
  helperTexts[field].textContent = errorMessage;
  helperTexts[field].classList.toggle('hidden', !errorMessage);
}

// 이벤트 리스너 추가
inputs.profile.addEventListener('change', () => {
  //이미지 미리보기
  const file = inputs.profile.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = document.getElementById('profile_preview');
      preview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
  validateField('profile', inputs.profile.value);
});
inputs.email.addEventListener('input', () => {
  validateField('email', inputs.email.value);
});

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

inputs.nickname.addEventListener('input', () => {
  validateField('nickname', inputs.nickname.value);
});

// 데이터 서버로 전송
document
  .getElementById('register_form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profile', inputs.profile.files[0]);
    formData.append('email', inputs.email.value);
    formData.append('password', inputs.password.value);
    formData.append('nickname', inputs.nickname.value);

    try {
      const response = await axios.post(`${serverURL}/regist`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('회원가입 성공');
      window.location.href = '/user/login';
    } catch (error) {
      console.error(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  });
