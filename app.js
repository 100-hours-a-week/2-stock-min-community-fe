const express = require('express');
const app = express();
const path = require('path');
const port = 5500; // 프론트엔드 서버 포트

// public 폴더를 정적 파일 경로로 설정
app.use(express.static(path.join(__dirname, '/public')));

// function isAuthenticated(req, res, next) {
//   if (!req.session.user) {
//     return res.status(401).send('Unauthorized: Please login first');
//   }
//   next(); // 인증 통과 시 다음 로직으로 진행
// }

app.get('/', (req, res) => {
  res.redirect('/user/login');
});
// USER;

// 회원가입 페이지
app.get('/user/regist', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Html', 'user_regist.html'));
});
// 로그인 페이지
app.get('/user/login', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Html', 'user_login.html'));
});
// 닉네임 변경 페이지
app.get('/user/nickname', (req, res) => {
  res.sendFile(
    path.join(__dirname, './Public/Html', 'user_nickname_modify.html')
  );
});
//비밀번호 변경 페이지
app.get('/user/password', (req, res) => {
  res.sendFile(
    path.join(__dirname, './Public/Html', 'user_password_modify.html')
  );
});

//POST

// 게시글 목록
app.get('/posts/list', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Html/post', 'post_list.html'));
});
// 게시글 수정
app.get('/posts/edit/:postID', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Html/post', 'post_modify.html'));
});
//게시글 추가
app.get('/posts/new', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Html/post', 'post_add.html'));
});
//게시글 조회
app.get('/posts/:postID', (req, res) => {
  res.sendFile(path.join(__dirname, './Public/Html/post', 'post_detail.html'));
});
// 서버 실행
app.listen(port, () => {
  console.log(`프론트 서버 시작 : http://localhost:${port}`);
});
