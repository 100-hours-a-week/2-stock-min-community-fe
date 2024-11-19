const { default: axios } = require('axios');

const addPost = document.getElementById('post_add');
const post = document.getElementById('post');
addPost.addEventListener('click', () => {
  window.location.href = '/api/v1/posts/new';
});
post.addEventListener('click', () => {
  window.location.href = '/api/v1/posts/';
});
async function uploadPost() {
  const postContainer = document.getElementById('post_list');
  try {
    const response = axios.get('/api/v1/posts');
    response.data.map((post) => {
      const postView = `<li class="user_post" id="">
            <div class="title_area">
              <h2>${post.title}</h2>
              <div class="post_info">
                <div class="like_comment_views">
                  <span>좋아요 0 </span><span>댓글 0 </span
                  ><span>조회수 0</span>
                </div>
                <span>2021-01-01 00:00:00</span>
              </div>
            </div>
            <div class="profile_area">
              <img
                src="/images/icon/profile_img.webp"
                alt="profile"
                class="profile_img"
              />
              <h4>더미 작성자 1</h4>
            </div>
          </li>`;
    });
    postContainer.appendChild(postView);
  } catch (error) {}
}
