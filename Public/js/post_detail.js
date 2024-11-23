const commentSubmit = document.getElementById('comment_submit');
const writeForm = document.getElementById('write_form');
const comment = document.getElementById('comment');
const currentLocation = window.location.pathname;
const postID = parseInt(currentLocation.split('/').pop());

const postModifyButton = document.getElementById('modify');
const postDeleteButton = document.getElementById('delete');

const commentModifyButton = document.getElementById('comment_modify');
const commentDeleteButton = document.getElementById('comment_delete');

//게시글 수정&삭제
postModifyButton.addEventListener('click', () => {
  window.location.href = `/api/v1/posts/edit/${postID}`;
});
postDeleteButton.addEventListener('click', async () => {
  const responseGetPosts = await axios.get('/api/v1/posts');
  const index = responseGetPosts.data.findIndex(
    (post) => postID === post.postID
  );
  const response = await axios.delete(`/api/v1/posts/${postID}`, index);
});

//댓글 수정&삭제
// commentModifyButton.addEventListener('click', () => {
//   document.getElementById();
// });
// commentDeleteButton.addEventListener('click', () => {});
// comment;

function getCurrentTime() {
  const now = new Date();

  // 각 시간 요소를 얻고 두 자리로 맞춤
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // 원하는 형식으로 조합
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// posts.JSON데이터 가져오기
viewDetail();
async function viewDetail() {
  const response = await axios.get('/api/v1/posts');
  const postInfo = {
    title: document.getElementById('title'),
    autor: document.getElementById('autor'),
    postDate: document.getElementById('post_date'),
    content: document.getElementById('content'),
    like: document.getElementById('like_count'),
    comment: document.getElementById('comment_count'),
    view: document.getElementById('view_count'),
  };

  const commentContainer = document.getElementById('comment_box');
  const index = response.data.findIndex((post) => postID === post.postID);

  postInfo.title.textContent = response.data[index].title;
  postInfo.autor.textContent = response.data[index].autor;
  postInfo.postDate.textContent = response.data[index].postDate;
  postInfo.content.textContent = response.data[index].content;
  postInfo.like.textContent = response.data[index].like;
  postInfo.comment.textContent = response.data[index].comment;
  postInfo.view.textContent = response.data[index].view;

  if (response.data[index].commentData) {
    response.data[index].commentData.map((comment) => {
      const commentView = `<div class="comment_user">
          <div class="profile">
            <img src="/images/icon/profile_img.webp" class="profile_img" />
            <h4 id="comment_autor">${comment.commentAutor}</h4>
          </div>
          <p id="comment_content">${comment.comment}</p>
        </div>
        <div class="comment_date">
          <p id="comment_date">${comment.commentDate}</p>
        </div>
        <div class="modify_delete">
          <button id="comment_modify">수정</button>
          <button id="comment_delete">삭제</button>
        </div>`;
      commentContainer.innerHTML += commentView;
    });
  }
}

comment.addEventListener('input', () => {
  if (!comment.value) {
    commentSubmit.style.backgroundColor = '#aca0eb';
    commentSubmit.setAttribute('type', 'button');
  } else {
    commentSubmit.style.backgroundColor = '#7F6AEE';
    commentSubmit.setAttribute('type', 'submit');
  }
});

writeForm.addEventListener('submit', async () => {
  const responseGetPosts = await axios.get('/api/v1/posts');
  const index = responseGetPosts.data.findIndex(
    (post) => postID === post.postID
  );
  const commentData = {
    postID: index,
    info: {
      comment: comment.value,
      commentDate: getCurrentTime(),
      commentAutor: '',
    },
  };
  const response = await axios.post('/api/v1/posts/comment', commentData);
});
