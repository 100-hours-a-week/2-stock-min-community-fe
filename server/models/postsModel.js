const fs = require('fs');
const path = require('path');

// 파일 경로 설정
const filePath = path.join(__dirname, '../data/posts.json');

function getPosts() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

function addPosts(post) {
  const posts = getPosts();
  const newPostID =
    posts.length > 0 ? Math.max(...posts.map((post) => post.postID)) + 1 : 1;
  posts.push(post);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
}

function deletePosts(post) {}

module.exports = { getPosts, addPosts, deletePosts };
