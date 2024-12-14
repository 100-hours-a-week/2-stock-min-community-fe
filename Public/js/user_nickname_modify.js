const modify_button = document.getElementById('modify_button');
const modify_toast = document.getElementById('modify_toast');
const user_delete = document.getElementById('user_delete');
const email = document.getElementById('email');
const profile = document.getElementById('profile_image');

const helper_nickname = document.getElementById('helper_text');
const nickname = document.getElementById('nickname_update');
const modify_form = document.getElementById('modify_form');
async function getCurrentUser() {
  try {
    const response = await axios.get('/api/v1/user');

    if (response.status === 200) {
      const userData = response.data;
      email.textContent = userData.email;
      profile_image.src = userData.profile;
    }
  } catch (error) {
    console.error('사용자 정보 불러올 수 없음 : ', error);
  }
}
getCurrentUser();

nickname.addEventListener('input', () => {
  const nickname_value = nickname.value;
  if (!nickname_value) {
    helper_nickname.classList.remove('hidden');
    helper_nickname.textContent = '* 닉네임을 입력하세요.';
    modify_button.setAttribute('type', 'button');
    modify_button.style.backgroundColor = '#aca0eb';
  } else if (nickname_value.length > 10) {
    helper_nickname.classList.remove('hidden');
    helper_nickname.textContent = '* 닉네임은 10자 내로 적어주세요';
    modify_button.setAttribute('type', 'button');
    modify_button.style.backgroundColor = '#aca0eb';
  } else if (/\s/.test(nickname_value)) {
    helper_nickname.classList.remove('hidden');
    helper_nickname.textContent = '* 닉네임에 공백을 포함할 수 없습니다.';
    modify_button.setAttribute('type', 'button');
    modify_button.style.backgroundColor = '#aca0eb';
  } else {
    helper_nickname.classList.add('hidden');
    modify_button.setAttribute('type', 'submit');
    modify_button.style.backgroundColor = '#7F6AEE';
  }
});

modify_form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nicknameValue = nickname.value;
  const patchList = {
    data: nicknameValue,
    field: 'nickname',
  };
  try {
    const response = await axios.patch('/api/v1/user', patchList);
    setTimeout(() => modify_toast.classList.add('show'), 100);
    setTimeout(() => modify_toast.classList.remove('show'), 3000);
  } catch (error) {
    console.error(error);
    alert('Error');
  }
});

document.getElementById('close_btn').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('check_btn').addEventListener('click', async () => {
  try {
    const response = await axios.delete('/api/v1/user');
    document.getElementById('modal').classList.add('hidden');
    alert('삭제 완료');
  } catch (error) {
    console.error(error);
    alert('처리 불가');
  }
});
