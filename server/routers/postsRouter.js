const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized: Please login first');
  }
  next(); // 인증 통과 시 다음 로직으로 진행
}

router.get('/list', isAuthenticated, postsController.getPostListPage);
router.get('/', isAuthenticated, postsController.getPosts);
router.post('/', isAuthenticated, postsController.createPost);
router.patch('/:postID', isAuthenticated, postsController.updatePost);
router.delete('/:postID', isAuthenticated, postsController.deletePost);

router.get('/new', isAuthenticated, postsController.getPostNewPage);
router.get('/:postID', isAuthenticated, postsController.getPostDetail);
router.get('/edit/:postID', isAuthenticated, postsController.getModifyPage);
router.post('/comment', isAuthenticated, postsController.createComment);

module.exports = router;
