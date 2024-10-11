import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('newPostBtn');
  const newPostForm = document.getElementById('newPostForm');
  const postForm = document.getElementById('postForm');

  newPostBtn.addEventListener('click', () => {
    newPostForm.style.display = newPostForm.style.display === 'none' ? 'block' : 'none';
  });

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const body = quill.root.innerHTML;

    await backend.addPost(title, body, author);
    postForm.reset();
    quill.setContents([]);
    newPostForm.style.display = 'none';
    fetchAndDisplayPosts();
  });

  fetchAndDisplayPosts();
});

async function fetchAndDisplayPosts() {
  const posts = await backend.getPosts();
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('article');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <p class="author">By ${post.author}</p>
      <div class="post-body">${post.body}</div>
      <p class="timestamp">${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}
