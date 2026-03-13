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
                            
                            <div id="formComentario-${post.id}">
                                <input type="text" id="name-${post.id}" placeholder="Nombre" required>
                                <input id="body-${post.id}" placeholder="Comentario" required>                            
                                <button onclick="agregarComentario(${post.id})">Agregar Comentario</button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="post-${post.id}" class="comments-container"></div>`
                });
                
                divPosts.innerHTML = divUserPosts;
            });
    });

    window.verComentarios = (postId) => {
        let divComentarios = document.getElementById(`post-${postId}`);

        if(divComentarios.innerHTML !== "") {
            divComentarios.style.display = "block";
            return null;
        }

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            .then(response => response.json())
            .then(comentarios => {
                let divComentariosPost = "";

                comentarios.forEach(comentario => {
                    divComentariosPost += `
                    <div class="card">    
                        <div class="card-body">
                            <h5 class="card-title">${comentario.name}</h5>
                            <p class="card-text">${comentario.body}</p>
                        </div>
                    </div>`
                });

                divComentarios.innerHTML += divComentariosPost;
            });
    }

    window.ocultarComentarios = (postId) => {
        let divComentarios = document.getElementById(`post-${postId}`);

        if(divComentarios) {
            divComentarios.style.display = "none"; // para ocultarlo sin borrarlo
        }
    }

    window.agregarComentario = (postId) => {

        let name = document.getElementById(`name-${postId}`).value;
        let body = document.getElementById(`body-${postId}`).value;

        let divComentarios = document.getElementById(`post-${postId}`);

        fetch(`https://jsonplaceholder.typicode.com/comments/`, {
            method: 'POST',
            body: JSON.stringify({
                postId: postId,
                name: name,
                body: body
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(comentario => {
            divComentarios.innerHTML += `
                <div class="card">    
                    <div class="card-body">
                        <h5 class="card-title">${comentario.name}</h5>
                        <p class="card-text">${comentario.body}</p>
                    </div>
                </div>`;

            document.getElementById(`name-${postId}`).value = "";
            document.getElementById(`body-${postId}`).value = "";
        });
    }