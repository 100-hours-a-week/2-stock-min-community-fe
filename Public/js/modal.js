// user_delete.addEventListener('click', () => {
//   document.getElementById('modal').classList.remove('hidden');
// });

function createModal(title, content) {
  const modal = document.getElementById('modal_box');
  modal.classList.remove('none');
  const modalContent = `
  <div class='modal'>
    <h2>${title}</h2>
    <p>${content}</p>
    <div class='button_box'>
      <button class='close_btn' id='close_btn'>
        취소
      </button>
      <button class='check_btn' id='check_btn'>
        확인
      </button>
    </div>
  </div>`;
  modal.innerHTML = modalContent;
  const closeBtn = document.getElementById('close_btn');
  const checkBtn = document.getElementById('check_btn');
  closeBtn.addEventListener('click', () => {
    modal.classList.add('none');
  });
  checkBtn.addEventListener('click', () => {
    modal.classList.add('none');
  });
}

function showModal(title, content) {
  createModal(title, content);
}
