const detail = document.getElementById('post_detail');
const add = document.getElementById('post_add');
const profile_menu = document.getElementsByClassName('profile_image');
detail.addEventListener('click', function () {
  window.location.href = 'postIndividual.html';
});
add.addEventListener('click', function () {
  window.location.href = 'postAdd.html';
});
profile_menu.addEventListener('mouseover', function () {
  console.log('tr');
});
