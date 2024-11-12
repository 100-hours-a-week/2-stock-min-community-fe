function getRelativeImagePath(relativePath) {
  const depth = (window.location.pathname.match(/\//g) || []).length - 2;
  const upLevel = '../'.repeat(depth);
  console.log(`${upLevel}${relativePath}`);
  return `${upLevel}${relativePath}`;
}
const logo = document.getElementById('logo');

const logo_basic = `<div class="logo_container">
        <div>
          
        </div>
        <div>
          <p class="logo_title">아무말 대잔치</p>
        </div>
        <div>
          
        </div>
      </div>`;
const logo_no_back = `<div class="logo_container">
        <div>
          
        </div>
        <div>
          <p class="logo_title">아무말 대잔치</p>
        </div>
        <div class="profile_box" id="profile_box">
          <img src="${getRelativeImagePath(
            'images/icon/profile_img.webp'
          )}" alt="" id="profile_img"/>
          <div class="profile_menu" id="profile_menu">
            
          </div>
        </div>
      </div>`;
const logo_no_profile = `<div class="logo_container">
        <div class="logo_back">
          <p><</p>
        </div>
        <div>
          <p class="logo_title">아무말 대잔치</p>
        </div>
        <div>
          
        </div>
      </div>`;

const url = window.location.pathname;
if (url.includes('user_login.html')) {
  logo.innerHTML = logo_basic;
} else if (url.includes('user_regist.html')) {
  logo.innerHTML = logo_no_profile;
} else {
  logo.innerHTML = logo_no_back;
}
document.getElementById('profile_img').addEventListener('mouseenter', () => {
  document.getElementById('profile_menu').innerHTML = `<ul id="menu">
                <li>회원정보 수정</li>
                <li>비밀번호 수정</li>
                <li>로그아웃</li>
            </ul>`;
});
document.getElementById('profile_box').addEventListener('mouseleave', () => {
  document.getElementById('profile_menu').innerHTML = ``;
});
