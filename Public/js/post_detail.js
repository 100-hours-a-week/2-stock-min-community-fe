const commentSubmit = document.getElementById('comment_submit');
const writeForm = document.getElementById('write_form');
const comment = document.getElementById('comment');
const currentLocation = window.location.pathname;
const postID = parseInt(currentLocation.split('/').pop());

const postModifyButton = document.getElementById('modify');
const postDeleteButton = document.getElementById('delete');

const backButton = document.getElementById('logo_back');

backButton.addEventListener('click', () => {
  window.location.href = `/api/v1/posts/list`;
});

//게시글 수정&삭제
postModifyButton.addEventListener('click', () => {
  window.location.href = `/api/v1/posts/edit/${postID}`;
});
postDeleteButton.addEventListener('click', async () => {
  const response = await axios.delete(`/api/v1/posts/${postID}`);
  window.location.href = '/api/v1/posts/list';
});

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

// 게시글 내용 출력문
viewDetail();
async function viewDetail() {
  const response = await axios.get('/api/v1/posts');
  const postInfo = {
    postIMG: document.getElementById('post_img_content'),
    title: document.getElementById('title'),
    autor: document.getElementById('autor'),
    postDate: document.getElementById('post_date'),
    content: document.getElementById('content'),
    like: document.getElementById('like_count'),
    comment: document.getElementById('comment_count'),
    view: document.getElementById('view_count'),
    profileImg: document.getElementById('profile_img_post'),
  };

  const index = response.data.data.findIndex((post) => postID === post.post_id);
  postInfo.profileImg.src = response.data.data[index].autorProfile;

  postInfo.postIMG.classList.toggle(
    'none',
    !response.data.data[index].postImage
  );
  postInfo.postIMG.src = response.data.data[index].postImage;

  postInfo.title.textContent = response.data.data[index].title;
  postInfo.autor.textContent = response.data.data[index].autor;
  postInfo.postDate.textContent = response.data.data[index].postDate;
  postInfo.content.textContent = response.data.data[index].content;
  postInfo.like.textContent = response.data.data[index].like;
  postInfo.comment.textContent = response.data.data[index].comment;
  postInfo.view.textContent = response.data.data[index].view;

  // 게시글 LCV 출력
  const like = document.getElementById('like_container');
  const likeCount = document.getElementById('like_count');
  const view = document.getElementById('view_count');
  const comment = document.getElementById('comment_count');
  const responseCommentCount = await axios.get(
    `/api/v1/posts/${postID}/count/comment`
  );
  const responseViewCount = await axios.get(
    `/api/v1/posts/${postID}/count/view`
  );

  like.addEventListener('click', async () => {
    const responseLikeAdd = await axios.post(
      `/api/v1/posts/${postID}/count/like`
    );
    const responseLikeCount = await axios.get(
      `/api/v1/posts/${postID}/count/like`
    );
    likeCount.innerText = responseLikeCount.data;
  });

  const responseLikeCount = await axios.get(
    `/api/v1/posts/${postID}/count/like`
  );
  likeCount.innerText = responseLikeCount.data;
  view.innerText = responseViewCount.data;
  comment.innerText = responseCommentCount.data.data[0]['COUNT(content)'];

  //게시글 댓글 출력문
  const commentContainer = document.getElementById('comment_box');
  const responseComment = await axios.get(`/api/v1/posts/comment/${postID}`);

  responseComment.data.data.map((comment) => {
    const commentView = `
    <div class="comment_ind">
        <div class="comment_info">
          <div class="profile">
            <img src="${comment.profile}" class="profile_img" />
            <h4 id="comment_autor">${comment.autor}</h4>
          </div>
          <div class="comment_date">
            <p id="comment_date">${comment.date}</p>
          </div>
          <div class="modify_delete">
            <button class="comment_modify" data-id=${comment.comment_id}>수정</button>
            <button class="comment_delete" data-id=${comment.comment_id}>삭제</button>
          </div>
        </div>
        <p id="comment_content${comment.comment_id}">${comment.content}</p>
    </div>`;
    commentContainer.innerHTML += commentView;
  });

  //댓글 수정
  document.querySelectorAll('.comment_modify').forEach((button) => {
    button.addEventListener('click', (event) => {
      const commit = document.createElement('button');
      commit.innerHTML = '확인';
      event.target.replaceWith(commit);

      const content = document.getElementById(
        `comment_content${event.target.dataset.id}`
      );
      const input = document.createElement('input');
      input.value = content.innerText;
      content.replaceWith(input);

      commit.addEventListener('click', async () => {
        const response = await axios.patch(
          `/api/v1/posts/comment/${event.target.dataset.id}`,
          { data: input.value }
        );
        window.location.reload();
      });
    });
  });

  //댓글 삭제
  document.querySelectorAll('.comment_delete').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const response = await axios.delete(
        `/api/v1/posts/comment/${event.target.dataset.id}`
      );
      window.location.reload();
    });
  });
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

writeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const commentData = {
    comment: comment.value,
    commentDate: getCurrentTime(),
    commentAutor: '',
  };
  const response = await axios.post(
    `/api/v1/posts/comment/${postID}`,
    commentData
  );
  window.location.reload();
});
