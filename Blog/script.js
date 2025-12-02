document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("posts-container");

    fetch("data.json")
        .then(res => res.json())
        .then(posts => {
            const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
            const allPosts = [...posts, ...savedPosts];

            allPosts.forEach(post => {
                const article = document.createElement("article");
                article.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <h2>${post.title}</h2>
                    <p class="date">${post.date}</p>
                    <p>${post.description}</p>
                    <a href="post.html?id=${post.id}" class="btn">Czytaj więcej</a>
                `;
                container.appendChild(article);
            });
        })
        .catch(err => console.error("Błąd ładowania danych:", err));
});
