const express = require('express');
const app = express();
const path = require('path');
const port = 5500; // 프론트엔드 서버 포트

// public 폴더를 정적 파일 경로로 설정
app.use(express.static(path.join(__dirname, '/public')));

// 서버 실행
app.listen(port, () => {
  console.log(`프론트 서버 시작 : http://localhost:${port}`);
});
