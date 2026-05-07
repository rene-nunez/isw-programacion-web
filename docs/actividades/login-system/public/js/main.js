// Elementos de la interfaz
const btnSignUp = document.getElementById("sign-up-button");
const btnSignIn = document.getElementById("sign-in-button");
const btnSecret = document.getElementById("secret-route-button");

let message = document.getElementById("message");

btnSignUp.addEventListener("click", () => {
  // .trim() para evitar errores de espaciado
  const username = document.getElementById("sign-up-username").value.trim();
  const password = document.getElementById("sign-up-password").value.trim();
  const repeatPassword = document.getElementById("signup-repeat-password").value.trim();

  if (!username || !password || !repeatPassword) {
    message.textContent = "Please fill in all fields";
    return;
  }

  if (password !== repeatPassword) {
    message.textContent = "Passwords do not match";
    return;
  }

  fetch("/api/sign-up", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password, password_repeat: repeatPassword})
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === "Registered!") {
        message.textContent = "Registered successfully!";

        document.getElementById("sign-up-username").value = "";
        document.getElementById("sign-up-password").value = "";
        document.getElementById("signup-repeat-password").value = "";

      } else {
        message.textContent = data.message || "Registration failed";
      }
    })
    .catch(err => {
      message.textContent = "Network error. Try again";
    });
});

let token = null;

btnSignIn.addEventListener("click", () => {
  const username = document.getElementById("sign-in-username").value.trim();
  const password = document.getElementById("sign-in-password").value;

  if (!username || !password) {
    message.textContent= "Please fill in all fields";
    return;
  }

  fetch("/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({username, password})
  })
    .then(response => response.json())
    .then(data => {
      console.log("Response: ", data);
      if (data.token) {
        token = data.token;
        message.textContent = "Logged in successfully!";

      } else {
        message.textContent = data.message || "Login failed";
      }
    })
    .catch(err => {
      message.textContent = "Network error. Try again";
    });
});

btnSecret.addEventListener("click", () => {
  const headers = {};

  if (token) headers["Authorization"] = "Bearer " + token;

  fetch("/api/secret-route", {headers})
    .then(response => response.text())
    .then(data => {
      console.log("Secret route response:", data);
      message.textContent = data;

    })
    .catch(err => {
      message.textContent= "Error accessing secret route";
    });
});