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
  try {
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
      autor: req.session.user.nickname,
    };
    console.log(postData);
    postsModel.addPosts(postData);
    res
      .status(201)
      .json({ message: 'Posts created successfully', data: postData });
  } catch (error) {
    console.error('Erorr in create user : ', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
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
  const posts = postsModel.getPosts();

  res.status(200).json(posts);
};
