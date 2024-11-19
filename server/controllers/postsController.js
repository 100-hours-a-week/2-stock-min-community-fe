const postsModel = require('../models/postsModel');
const path = require('path');

exports.getPostListPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'post', 'post_list.html')
  );
};
exports.getPostNewPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'post', 'post_add.html')
  );
};
exports.getPostDetail = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'post', 'post_add.html')
  );
};

exports.createPost = (req, res) => {
  const { title, content, postDate } = req.body;
  const posts = postsModel.getPosts();
  const newPostID =
    posts.length > 0 ? Math.max(...posts.map((post) => post.postID)) + 1 : 1;
  const postData = {
    postID: newPostID,
    title,
    content,
    like: 0,
    comment: 0,
    view: 0,
    postDate,
    autor: req.session.user.email,
  };

  postsModel.addPosts(postData);
};
exports.getPosts = (req, res) => {
  const posts = postsModel.getPosts();

  res.status(200).json(posts);
};
