const addPost = document.getElementById('post_add');

addPost.addEventListener('click', () => {
  window.location.href = '/posts/new';
});
async function fetchUser() {
  try {
    const response = await axios.get(`${serverURL}/user`, {
      withCredentials: 'include',
    });
  } catch (error) {
    console.error('세션 정보 가져오기 실패 : ', error);
  }
}

async function uploadPost() {
  fetchUser();
  const postContainer = document.getElementById('post_list');
  try {
    const response = await axios.get(`${serverURL}/posts`);
    // const responseCommentCount = await axios.get(
    //   `/api/v1/posts/${postID}/count/comment`
    // );
    // const responseViewCount = await axios.get(
    //   `/api/v1/posts/${postID}/count/view`
    // );
    // const responseLikeCount = await axios.get(
    //   `/api/v1/posts/${postID}/count/like`
    // );

    response.data.data.map((post) => {
      const postView = `<li class="user_post" id="${post.post_id}">
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
                src="${imageURL}${post.autorProfile}"
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
      window.location.href = `/posts/${item.id}`;
    });
  });
}
