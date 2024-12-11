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
        <img src="/images/profile_img.webp" alt="" id="profile_img"/>
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
        <img src="/images/profile_img.webp" alt="" id="profile_img"/>
        <div class="profile_menu" id="profile_menu">
          
        </div>
      </div>
    </div>`;
const url = window.location.pathname;

const logo_default = ['/login'];
const logo_has_back = ['/regist'];
const logo_has_profile = ['/posts/list', '/user/nickname', '/user/password'];
const logo_has_full = ['/posts/edit', '/posts/new', '/posts'];

if (logo_default.some((pattern) => url.includes(pattern))) {
  logo.innerHTML = logo_basic;
} else if (logo_has_back.some((pattern) => url.includes(pattern))) {
  logo.innerHTML = logo_no_profile;
} else if (logo_has_profile.some((pattern) => url.includes(pattern))) {
  logo.innerHTML = logo_no_back;
} else {
  logo.innerHTML = logo_all;
  console.log(document.getElementById('profile_img').src);
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
  document.getElementById('logout').addEventListener('click', async () => {
    try {
      const response = await axios.get('/api/v1/logout');
      window.location.href = '/api/v1/login';
    } catch (error) {
      console.error('Error : ', error);
    }
  });
});
document.getElementById('profile_box').addEventListener('mouseleave', () => {
  document.getElementById('profile_menu').innerHTML = ``;
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get('/api/v1/user');
    const profile_img = document.getElementById('profile_img');

    profile_img.src = response.data.profile;
  } catch (error) {
    console.error('Error : ', error);
  }
});
