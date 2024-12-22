function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Seoul',
  });
}

const addPost = document.getElementById('post_add');

addPost.addEventListener('click', () => {
  window.location.href = '/posts/new';
});

async function uploadPost() {
  const postContainer = document.getElementById('post_list');
  try {
    const response = await axios.get(`${serverURL}/posts`);

    response.data.data.map(async (post) => {
      const postView = `<li class="user_post" id="${post.post_id}">
            <div class="title_area">
              <h2>${post.title}</h2>
              <div class="post_info">
                <div class="like_comment_views">
                  <span>좋아요 ${post.like_count} </span><span>댓글 ${
        post.comment_count
      } </span>
                  <span>조회수 ${post.view_count}</span>
                </div>
                <span>${formatDate(post.postDate)}</span>
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
      postContainer.insertAdjacentHTML('afterbegin', postView);
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
