const postContainer = document.querySelector('#post-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;

//fetch post from API
const getPost = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();
  return data;
}

//Show Posts in DOM
const showPosts = async () => {
  const posts =  await getPost();
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title"> ${post.title} </h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postContainer.append(postEl);
  });
}

//show initial post
showPosts();

//show loading & fetch more posts
const showLoading = () => {
  loading.classList.add('show');

  setTimeout(()=>{
    loading.classList.remove('show');
    setTimeout(()=>{
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

window.addEventListener('scroll', () => {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  if(scrollTop + clientHeight >= scrollHeight -5){
    showLoading();
  }
});

//filter post by input
const filterPosts = e => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');
  
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
      post.style.display = 'flex';
    }else{
      post.style.display = 'none';
    }
  });
};

filter.addEventListener('input', filterPosts);