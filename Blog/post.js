const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const postContainer = document.getElementById("post-container");

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
                <h3>Komentarze</h3>
                <div id="comment-list"></div>
                <form id="comment-form">
                    <input type="text" id="author" placeholder="Twoje imię" required>
                    <textarea id="text" placeholder="Twój komentarz" required></textarea>
                    <button type="submit">Dodaj komentarz</button>
                </form>
            `;
            // Po wstawieniu formularza i listy, pobierz nowe referencje do elementów
            commentList = document.getElementById("comment-list");
            commentForm = document.getElementById("comment-form");
            renderComments();
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
        }
    });
