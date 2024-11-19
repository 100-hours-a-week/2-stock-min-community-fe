// function getRelativeImagePath(relativePath) {
//   const depth = (window.location.pathname.match(/\//g) || []).length - 2;
//   const upLevel = '/'.repeat(depth);
//   console.log(`${upLevel}${relativePath}`);
//   return `${upLevel}${relativePath}`;
// }
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
const logo_no_profile = `<div class="logo_container">
        <div class="logo_back" id="logo_back">
          <p><</p>
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
        <img src="
          /images/icon/profile_img.webp" alt="" id="profile_img"/>
        <div class="profile_menu" id="profile_menu">
          
        </div>
      </div>
    </div>`;
const logo_all = `<div class="logo_container">
       <div class="logo_back" id="logo_back">
          <p><</p>
        </div>
      <div>
        <p class="logo_title">아무말 대잔치</p>
      </div>
      <div class="profile_box" id="profile_box">
        <img src="/images/icon/profile_img.webp" alt="" id="profile_img"/>
        <div class="profile_menu" id="profile_menu">
          
        </div>
      </div>
    </div>`;
const url = window.location.pathname;

const has_back = ['post_detail.html', 'post_modify.html', 'post_add.html'];
const no_back = ['user_password_modify.html', 'user_nickname_modify.html'];

if (url.includes('user_login.html')) {
  logo.innerHTML = logo_basic;
} else if (url.includes('user_regist.html')) {
  logo.innerHTML = logo_no_profile;
} else if (no_back.some((path) => url.includes(path))) {
  logo.innerHTML = logo_no_back;
} else {
  logo.innerHTML = logo_all;
}
document.getElementById('profile_img').addEventListener('mouseenter', () => {
  document.getElementById('profile_menu').innerHTML = `<ul id="menu">
                <li id="nickname_modify">회원정보 수정</li>
                <li id="password_modify">비밀번호 수정</li>
                <li id="logout">로그아웃</li>
            </ul>`;
  document.getElementById('nickname_modify').addEventListener('click', () => {
    window.location.href = '/api/v1/user/nickname';
  });
  document.getElementById('password_modify').addEventListener('click', () => {
    window.location.href = '/api/v1/user/password';
  });
});
document.getElementById('profile_box').addEventListener('mouseleave', () => {
  document.getElementById('profile_menu').innerHTML = ``;
});
