//시간 출력 형식 맞춰주기
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
async function getPostsComment() {
  const response = axios.get(`${serverURL}/comment/${postID}`);
  return response.data;
}
function authCheck(commentNum) {
  document.querySelectorAll('.modify_delete').forEach((element) => {});
}
const commentSubmit = document.getElementById('comment_submit');
const writeForm = document.getElementById('write_form');
const comment = document.getElementById('comment');
const currentLocation = window.location.pathname;
const postID = parseInt(currentLocation.split('/').pop());

const backButton = document.getElementById('logo_back');

backButton.addEventListener('click', () => {
  window.location.href = `/posts/list`;
});

//게시글 수정&삭제

function getCurrentTime() {
  const now = new Date();
  return now;
}

// 게시글 내용 출력문
viewDetail();
async function viewDetail() {
  const response = await axios.get(`${serverURL}/posts`, {
    withCredentials: 'include',
  });
  const responseGetAuth = await axios.get(`${serverURL}/posts/auth`, {
    withCredentials: 'include',
  });
  const postInfo = {
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
  postInfo.profileImg.src = `${imageURL}${response.data.data[index].autorProfile}`;

  //게시글 이미지 추가
  if (response.data.data[index].postImage) {
    const content_box = document.getElementById('content_box');
    const img = document.createElement('img');
    img.src = `${imageURL}${response.data.data[index].postImage}`;
    img.id = 'post_img_content';
    content_box.insertAdjacentElement('afterbegin', img);
  }

  //내가 만든 게시글만 수정/삭제 버튼 띄우기
  if (responseGetAuth.data.post.find((element) => element.post_id === postID)) {
    const postMD = document.getElementById('post_md_button');
    const mdButton = `
    <button id="modify">수정</button>
            <button
              id="delete"
              onclick="createModal('게시글을 삭제하시겠습니까?','삭제한 내용은 복구할 수 없습니다')"
            >
              삭제
            </button>
            `;
    postMD.innerHTML = mdButton;
    const postModifyButton = document.getElementById('modify');
    const postDeleteButton = document.getElementById('delete');
    postModifyButton.addEventListener('click', () => {
      window.location.href = `/posts/edit/${postID}`;
    });
    postDeleteButton.addEventListener('click', async () => {
      const checkBtn = document.getElementById('check_btn');
      checkBtn.addEventListener('click', async () => {
        const response = await axios.delete(`${serverURL}/posts/${postID}`, {
          withCredentials: 'include',
        });
        window.location.href = `/posts/list`;
      });
    });
  }

  postInfo.title.textContent = response.data.data[index].title;
  postInfo.autor.textContent = response.data.data[index].autor;
  postInfo.postDate.textContent = formatDate(
    response.data.data[index].postDate
  );
  postInfo.content.textContent = response.data.data[index].content;
  postInfo.like.textContent = response.data.data[index].like;
  postInfo.comment.textContent = response.data.data[index].comment;
  postInfo.view.textContent = response.data.data[index].view;

  // 게시글 LCV 출력
  const like = document.getElementById('like_container');
  const likeCount = document.getElementById('like_count');
  const view = document.getElementById('view_count');
  const comment = document.getElementById('comment_count');
  const responseAddView = await axios.get(
    `${serverURL}/posts/${postID}/count/view`,
    {
      withCredentials: 'include',
    }
  );
  const responseGetLCV = await axios.get(`${serverURL}/posts/lcv/${postID}`, {
    withCredentials: 'include',
  });

  const responseCheckLike = await axios.get(
    `${serverURL}/posts/${postID}/check/like`,
    {
      withCredentials: 'include',
    }
  );
  like.classList.toggle('likePushed', responseCheckLike.data.data[0].cnt > 0);

  //좋아요 버튼 클릭 시
  like.addEventListener('click', async () => {
    const responseCheckLike = await axios.get(
      `${serverURL}/posts/${postID}/check/like`,
      {
        withCredentials: 'include',
      }
    );
    like.classList.toggle(
      'likePushed',
      responseCheckLike.data.data[0].cnt === 0
    );

    if (responseCheckLike.data.data[0].cnt === 0) {
      const responseAddLike = await axios.get(
        `${serverURL}/posts/${postID}/count/like`,
        {
          withCredentials: 'include',
        }
      );
    } else {
      const responseDeleteLike = await axios.delete(
        `${serverURL}/posts/${postID}/count/like`,
        {
          withCredentials: 'include',
        }
      );
    }
    const responseGetLCV = await axios.get(`${serverURL}/posts/lcv/${postID}`, {
      withCredentials: 'include',
    });

    likeCount.innerText = responseGetLCV.data[0].like_count;
  });

  //좋아요, 댓글 수, 조회수 출력
  likeCount.innerText = responseGetLCV.data[0].like_count;
  view.innerText = responseGetLCV.data[0].view_count;
  comment.innerText = responseGetLCV.data[0].comment_count;

  //게시글 댓글 출력문
  const commentContainer = document.getElementById('comment_box');
  const responseComment = await axios.get(
    `${serverURL}/posts/comment/${postID}`
  );

  responseComment.data.data.map((comment) => {
    const commentView = `
    <div class="comment_ind">
        <div class="comment_info">
          <div class="profile">
            <img src="${imageURL}${comment.profile}" class="profile_img" />
            <h4 id="comment_autor">${comment.autor}</h4>
          </div>
          <div class="comment_date">
            <p id="comment_date">${formatDate(comment.date)}</p>
          </div>
          <div class="modify_delete" id="comment_md${comment.comment_id}">
          </div>
        </div>
        <p id="comment_content${comment.comment_id}">${comment.content}</p>
    </div>`;
    commentContainer.innerHTML += commentView;

    //내가 작성한 댓글만 수정/삭제 버튼 생성
    if (
      responseGetAuth.data.comment.find(
        (element) => element.comment_id === comment.comment_id
      )
    ) {
      const commentMD = document.getElementById(
        `comment_md${comment.comment_id}`
      );
      commentMD.innerHTML = `
      <button class="comment_modify" data-id=${comment.comment_id}>수정</button>
      <button class="comment_delete" data-id=${comment.comment_id} onclick="createModal('댓글을 삭제하시겠습니까?','삭제한 내용은 복구할 수 없습니다')">삭제</button>
      `;
    }
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
          `${serverURL}/posts/comment/${event.target.dataset.id}`,
          { data: input.value }
        );
        window.location.reload();
      });
    });
  });

  //댓글 삭제
  document.querySelectorAll('.comment_delete').forEach((button) => {
    button.addEventListener('click', (event) => {
      const checkBtn = document.getElementById('check_btn');
      checkBtn.addEventListener('click', async () => {
        const response = await axios.delete(
          `${serverURL}/posts/comment/${event.target.dataset.id}`
        );
        window.location.reload();
      });
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
    `${serverURL}/posts/comment/${postID}`,
    commentData,
    {
      withCredentials: 'include',
    }
  );
  window.location.reload();
});
