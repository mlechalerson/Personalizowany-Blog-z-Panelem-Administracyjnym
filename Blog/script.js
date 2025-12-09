document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("posts-container");

    function renderPostsArray(allPosts) {
        container.innerHTML = "";
        allPosts.forEach(post => {
            const article = document.createElement("article");
            article.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <h2>${post.title}</h2>
                <p class="date">${post.date}</p>
                <p>${post.description}</p>
                <h3>Komentarze</h3>
                <div class="comment-list" id="comment-list-${post.id}"></div>
                <form class="comment-form" id="comment-form-${post.id}">
                    <input type="text" name="author" placeholder="Twoje imię" required>
                    <textarea name="text" placeholder="Twój komentarz" required></textarea>
                    <button type="submit">Dodaj komentarz</button>
                </form>
                <a href="post.html?id=${post.id}" class="btn">Komentarze</a>
            `;
            container.appendChild(article);

            // Render comments
            const commentList = article.querySelector(`#comment-list-${post.id}`);
            const commentForm = article.querySelector(`#comment-form-${post.id}`);
            let comments = JSON.parse(localStorage.getItem(`comments-${post.id}`)) || [];
            function renderComments() {
                commentList.innerHTML = "";
                comments.forEach(c => {
                    const div = document.createElement("div");
                    div.classList.add("comment");
                    div.innerHTML = `<strong>${c.author}</strong><p>${c.text}</p>`;
                    commentList.appendChild(div);
                });
            }
            renderComments();
            commentForm.addEventListener("submit", e => {
                e.preventDefault();
                const author = commentForm.querySelector('[name="author"]').value;
                const text = commentForm.querySelector('[name="text"]').value;
                const newComment = { author, text };
                comments.push(newComment);
                localStorage.setItem(`comments-${post.id}`, JSON.stringify(comments));
                commentForm.reset();
                renderComments();
            });
        });
    }

    function loadPosts() {
        fetch("data.json")
            .then(res => res.json())
            .then(posts => {
                const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
                const allPosts = [...posts, ...savedPosts];
                renderPostsArray(allPosts);
            })
            .catch(err => {
                console.error("Błąd ładowania danych:", err);
                const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
                renderPostsArray(savedPosts);
            });
    }

    loadPosts();

    window.addEventListener('storage', (e) => {
        if (e.key === 'posts') loadPosts();
    });
});
