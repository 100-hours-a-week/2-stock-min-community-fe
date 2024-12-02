const fs = require('fs');
const path = require('path');
const connection = require('../db');

// 파일 경로 설정
const filePath = path.join(__dirname, '../data/posts.json');

function getPosts(callback) {
  const query = `SELECT * FROM POSTS`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function addPosts(callback, post) {
  const query = `INSERT INTO POSTS (title, content, like, comment, view, postDate, autor) VALUES (?,?,?,?,?,?,?)`;
  connection.query(query, [], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function updatePosts(postID, data) {}
function deletePosts(postID) {}

function getComment(callback) {}
function addComment(postID, data) {}

module.exports = { getPosts, addPosts, deletePosts, addComment, updatePosts };
