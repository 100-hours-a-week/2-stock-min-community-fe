const express = require('express');
const upload = require('../middlewares/multer');
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
router.get('/edit/:postID', isAuthenticated, postsController.getModifyPage);
router.post(
  '/',
  isAuthenticated,
  upload('postImage').single('postImage'),
  postsController.createPost
);

router.patch(
  '/:postID',
  isAuthenticated,
  upload('postImage').single('postIMG'),
  postsController.updatePost
);
router.delete('/:postID', isAuthenticated, postsController.deletePost);

router.get('/new', isAuthenticated, postsController.getPostNewPage);
router.get('/:postID', isAuthenticated, postsController.getPostDetail);

//LCV
router.get('/lcv/:postID', isAuthenticated, postsController.countComment);

// COMMENT
router.get('/comment/:postID', isAuthenticated, postsController.getComment);
router.post('/comment/:postID', isAuthenticated, postsController.createComment);
router.patch(
  '/comment/:commentID',
  isAuthenticated,
  postsController.patchComment
);
router.delete(
  '/comment/:commentID',
  isAuthenticated,
  postsController.deleteComment
);

module.exports = router;
