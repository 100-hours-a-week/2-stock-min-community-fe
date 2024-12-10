const fs = require('fs');
const path = require('path');
const connection = require('../db');
const redisClient = require('../redis');

// 파일 경로 설정
const filePath = path.join(__dirname, '../data/posts.json');

function anyQuery(query, callback) {
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function getPosts(callback) {
  const query = `SELECT * FROM POSTS`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function addPosts(post, callback) {
  const query = `INSERT INTO POSTS (postImage, title, content, \`like\`, comment, view, postDate, autor,autorProfile) VALUES (?,?,?,?,?,?,?,?,?)`;
  connection.query(
    query,
    [
      post.postImage,
      post.title,
      post.content,
      post.like,
      post.comment,
      post.view,
      post.postDate,
      post.autor,
      post.autorProfile,
    ],
    (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    }
  );
}

function updatePosts(data, callback) {
  const query = `UPDATE POSTS SET title = '${data.title}',content ='${data.content}',postImage='${data.postIMG}' WHERE post_id = ${data.postID}`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}
function deletePosts(postID, callback) {
  const query = 'DELETE FROM POSTS WHERE post_id=?';
  connection.query(query, postID, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}

function addComment(postID, data, callback) {
  const query = `INSERT INTO COMMENT (post_id,profile,content,date,autor) VALUES (?,?,?,?,?)`;
  connection.query(
    query,
    [
      postID,
      data.commentProfile,
      data.comment,
      data.commentDate,
      data.commentAutor,
    ],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
}
function getComment(postID, callback) {
  const query = `SELECT c.comment_id,c.profile,c.content,c.date,c.autor FROM COMMENT AS c INNER JOIN POSTS AS p ON c.post_id = p.post_id WHERE c.post_id = ${postID}`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}
function deleteComment(commentID, callback) {
  const query = `DELETE FROM COMMENT AS c WHERE c.comment_id = ${commentID}`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}
function patchComment(commentID, data, callback) {
  const query = `UPDATE COMMENT SET content = '${data}' WHERE comment_id = ${commentID}`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function deletePostComment(postID, callback) {
  const query = `DELETE FROM COMMENT WHERE post_id=${postID}`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

function countComment(postID, callback) {
  const query = `SELECT COUNT(content) FROM COMMENT WHERE post_id = ${postID}`;
  connection.query(query, (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
}

async function addView(postID, userID) {
  try {
    const viewCount = await redisClient.sAdd(`post:${postID}:views`, userID);
  } catch (error) {
    console.error('Redis 조회수 증가 오류 : ', err);
    throw err;
  }
}
async function getViewCount(postID) {
  try {
    const viewCount = await redisClient.sCard(`post:${postID}:views`);
    return viewCount;
  } catch (error) {
    console.error('Redis 조회수 가져오기 오류:', err);
    throw err;
  }
}
async function addLike(postID, userID) {
  try {
    const likeCount = await redisClient.sAdd(`post:${postID}:like`, userID);
  } catch (error) {
    console.error(`Redis 좋아요 등록 오류:`, err);
    throw err;
  }
}
async function getLikeCount(postID) {
  try {
    const likeCount = await redisClient.sCard(`post:${postID}:like`);

    return likeCount;
  } catch (error) {
    console.error(`Redis 좋아요 가져오기 오류`);
  }
}
module.exports = {
  getPosts,
  addPosts,
  deletePosts,
  addComment,
  updatePosts,
  getComment,
  deleteComment,
  patchComment,
  anyQuery,
  deletePostComment,
  countComment,
  addView,
  getViewCount,
  addLike,
  getLikeCount,
};
