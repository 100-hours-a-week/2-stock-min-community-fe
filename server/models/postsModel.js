const fs = require('fs');
const path = require('path');

// 파일 경로 설정
const filePath = path.join(__dirname, '../data/posts.json');

function getPosts() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading posts file:', error);
    return [];
  }
}

function addPosts(post) {
  const posts = getPosts();

  posts.push(post);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
}

function updatePosts(postID, data) {
  const posts = getPosts();
  posts[postID].title = data.title;
  posts[postID].content = data.content;
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
}
function deletePosts(postID) {
  const posts = getPosts();
  posts.splice(postID, 1);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
}

function addComment(postID, data) {
  const posts = getPosts();
  posts[postID].commentData = posts[postID].commentData || [];
  posts[postID].commentData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
}

module.exports = { getPosts, addPosts, deletePosts, addComment, updatePosts };
