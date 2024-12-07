const addPost = document.getElementById('post_add');

addPost.addEventListener('click', () => {
  window.location.href = '/api/v1/posts/new';
});

async function uploadPost() {
  const postContainer = document.getElementById('post_list');
  try {
    const response = await axios.get('/api/v1/posts');

    response.data.map((post) => {
      const postView = `<li class="user_post" id="${post.postID}">
            <div class="title_area">
              <h2>${post.title}</h2>
              <div class="post_info">
                <div class="like_comment_views">
                  <span>좋아요 ${post.like} </span><span>댓글 ${post.comment} </span
                  ><span>조회수 ${post.view}</span>
                </div>
                <span>${post.postDate}</span>
              </div>
            </div>
            <div class="profile_area">
              <img
                src="/images/icon/profile_img.webp"
                alt="profile"
                class="profile_img"
              />
              <h4>${post.autor}</h4>
            </div>
          </li>`;
      postContainer.innerHTML += postView;
    });
  } catch (error) {
    console.error('데이터 불러오기 오류 : ', error);
  }
  addLiEvent();
}
uploadPost();

function addLiEvent() {
  const listItems = document.querySelectorAll('#post_list li');
  listItems.forEach((item) => {
    item.addEventListener('click', () => {
      window.location.href = `/api/v1/posts/${item.id}`;
    });
  });
}
