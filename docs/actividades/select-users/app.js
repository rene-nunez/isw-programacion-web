    const selectUsers = document.getElementById("selectUsers");
    const divPosts = document.getElementById("divPosts");
    const btnCargar = document.getElementById("btnCargar");

    btnCargar.addEventListener("click", () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {
                let optUsers = "";
                users.forEach(user => {
                    optUsers += `<option value=${user.id}>${user.username}</option>`
                });
                selectUsers.innerHTML = optUsers;
            });
    });

    selectUsers.addEventListener("change", () => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectUsers.value}`)
            .then(response => response.json())
            .then(posts => {
                let divUserPosts = "";

                posts.forEach(post => {
                    divUserPosts += `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.body}</p>
                            <button class="btn btn-primary" onclick="verComentarios(${post.id})">Ver comentarios</button>
                            <button class="btn btn-primary" onclick="ocultarComentarios(${post.id})">Ocultar comentarios</button>
                        </div>
                    </div>
                    
                    <div id="post-${post.id}" class="comments-container"></div>`
                });

                divPosts.innerHTML = divUserPosts;
            });
    });

    window.verComentarios = (postID) => {
        let div = document.getElementById(`post-${postID}`);

        if(div.innerHTML !== "") {
            div.style.display = "block";
            return null;
        }

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postID}`)
            .then(response => response.json())
            .then(comments => {
                let divComments = "";

                comments.forEach(comment => {
                    divComments += `
                    <div class="card">    
                        <div class="card-body">
                            <h5 class="card-title">${comment.name}</h5>
                            <p class="card-text">${comment.body}</p>
                        </div>
                    </div>`
                });

                div.innerHTML = divComments;
            });
    }

    window.ocultarComentarios = (postID) => {
        let div = document.getElementById(`post-${postID}`);

        if(div) {
            div.style.display = "none"; // para ocultarlo sin borrarlo
        }
    }