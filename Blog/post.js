const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const postContainer = document.getElementById("post-container");
const commentList = document.getElementById("comment-list");
const commentForm = document.getElementById("comment-form");

let comments = JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];

function renderComments() {
    commentList.innerHTML = "";
    comments.forEach(c => {
        const div = document.createElement("div");
        div.classList.add("comment");
        div.innerHTML = `<strong>${c.author}</strong><p>${c.text}</p>`;
        commentList.appendChild(div);
    });
}

fetch("data.json")
    .then(res => res.json())
    .then(posts => {
        const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const allPosts = [...posts, ...savedPosts];
        const post = allPosts.find(p => p.id == postId);

        if (post) {
            postContainer.innerHTML = `
                <h1>${post.title}</h1>
                <img src="${post.image}" alt="${post.title}">
                <p>${post.content}</p>
            `;
        }
    });

commentForm.addEventListener("submit", e => {
    e.preventDefault();
    const author = document.getElementById("author").value;
    const text = document.getElementById("text").value;

    const newComment = { author, text };
    comments.push(newComment);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(comments));

    commentForm.reset();
    renderComments();
});

renderComments();
