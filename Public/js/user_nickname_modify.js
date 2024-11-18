const change_button = document.getElementById('image_modify');
const modify_button = document.getElementById('submit_button');
const user_delete = document.getElementById('user_delete');
change_button.addEventListener('click', () => {});
modify_button.addEventListener('click', () => {
  // - 수정하기 클릭시
  //     - 수정 성공하면 5.'수정완료'라는 토스트 메시지가 보여진다.
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
