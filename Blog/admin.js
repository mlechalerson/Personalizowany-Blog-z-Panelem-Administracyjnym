const PASSWORD = "admin123"; 

const loginForm = document.getElementById("login-form");
const adminSection = document.getElementById("admin-section");
const postForm = document.getElementById("post-form");
const loginSection = document.getElementById("login-section");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

function renderPosts() {
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
    posts.forEach((p, i) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${p.title}</h3>
            <button onclick="deletePost(${i})">Usuń</button>
        `;
        postList.appendChild(div);
    });
}

function deletePost(i) {
    posts.splice(i, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
}

// Obsługa logowania
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const password = document.getElementById("password").value;

    if (password === PASSWORD) {
        // Jeśli hasło jest poprawne
        loginSection.style.display = "none";  // Ukrywamy sekcję logowania
        adminSection.style.display = "block"; // Pokazujemy sekcję administracyjną
        renderPosts(); // Renderowanie postów po zalogowaniu
    } else {
        alert("Niepoprawne hasło!");
    }
});

// Obsługa formularza dodawania posta
postForm.addEventListener("submit", e => {
    e.preventDefault();

    const newPost = {
        id: Date.now(),
        title: document.getElementById("title").value,
        image: document.getElementById("image").value,
        description: document.getElementById("content").value.slice(0, 100) + "...",
        content: document.getElementById("content").value,
        date: new Date().toLocaleDateString("pl-PL")
    };

    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
    postForm.reset();
});
