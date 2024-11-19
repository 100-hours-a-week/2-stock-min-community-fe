const change_button = document.getElementById('image_modify');
const modify_button = document.getElementById('modify_button');
const modify_toast = document.getElementById('modify_toast');
const user_delete = document.getElementById('user_delete');
modify_button.addEventListener('click', async () => {
  const nicknameValue = document.getElementById('nickname_update').value;
  const patchList = {
    data: nicknameValue,
    field: 'nickname',
  };
  try {
    setTimeout(() => modify_toast.classList.add('show'), 100);
    setTimeout(() => {
      modify_toast.classList.remove('show');
      setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
    const response = await axios.patch('/api/v1/user', patchList);
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
