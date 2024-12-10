const redis = require('redis');

// Redis 클라이언트 생성
const client = redis.createClient({
  host: '127.0.0.1', // Redis 서버 주소
  port: 6379, // Redis 기본 포트
});

client.on('connect', () => {
  console.log('Redis에 연결 되었습니다.');
});

client.on('error', (err) => {
  console.error('Redis 연결 오류:', err);
});

(async () => {
  await client.connect();
})();

module.exports = client;
