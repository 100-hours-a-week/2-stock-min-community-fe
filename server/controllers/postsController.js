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
    path.join(__dirname, '../../Public', 'Html', 'post', 'post_detail.html')
  );
};
exports.getModifyPage = (req, res) => {
  res.sendFile(
    path.join(__dirname, '../../Public', 'Html', 'post', 'post_modify.html')
  );
};

exports.createPost = (req, res) => {
  const { title, content, postDate } = req.body;

  const postData = {
    title,
    content,
    like: 0,
    comment: 0,
    view: 0,
    postDate,
    autor: req.session.user.nickname,
  };
  console.log(postData);
  postsModel.addPosts(postData, (err, results) => {
    if (err) {
      return res.status(500).send('Error Create Post');
    }
    res.status(200).send({ message: 'Post Add Success' });
  });
};
exports.updatePost = (req, res) => {
  postsModel.updatePosts(req.body.postID, req.body.postData);
};
exports.deletePost = (req, res) => {
  postsModel.deletePosts(req.body.index);
};
exports.createComment = (req, res) => {
  req.body.info.commentAutor = req.session.user.nickname;
  postsModel.addComment(req.body.postID, req.body.info);
};

exports.getPosts = (req, res) => {
  postsModel.getPosts((err, results) => {
    if (err) return res.status(500).send('Error get Post Data');
    console.log(results);
    return res.status(200).send({ data: results });
  });
};
