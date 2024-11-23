const title = document.getElementById('title');
const content = document.getElementById('content');
const modifyForm = document.getElementById('post_write');
const submitButton = document.getElementById('submit_button');
const currentLocation = window.location.pathname;
const postID = parseInt(currentLocation.split('/').pop());
function validate() {
  if (!title.value) {
    submitButton.style.backgroundColor = '#aca0eb';
    submitButton.setAttribute('type', 'button');
  } else if (!content.value) {
    submitButton.style.backgroundColor = '#aca0eb';
    submitButton.setAttribute('type', 'button');
  } else {
    submitButton.style.backgroundColor = '#7F6AEE';
    submitButton.setAttribute('type', 'submit');
  }
}
title.addEventListener('input', validate);
content.addEventListener('input', validate);
modifyForm.addEventListener('submit', async () => {
  const responseGetPosts = await axios.get('/api/v1/posts');

  const index = responseGetPosts.data.findIndex(
    (post) => postID === post.postID
  );
  const data = {
    postID: index,
    postData: {
      title: title.value,
      content: content.value,
    },
  };
  const response = await axios.patch(`/api/v1/posts/${postID}`, data);
});
