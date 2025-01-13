
function init() {
    const form = document.getElementById("userForm");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById('username');
        const resultDiv = document.querySelector('.result');

        if (!username || !resultDiv) {
            console.log("___Error", "Username or result not found");
            return;
        }

        const usernameValue = username.value.trim();

        resultDiv.innerHTML = "";

        if (usernameValue === "") {
            resultDiv.innerHTML = "Please enter a username";
            return;
        }

        const response = await fetch(`https://api.github.com/users/${usernameValue}`);

        if(!response.ok) {
            if (response.status === 404) {
                resultDiv.innerHTML = "User not found";
            } else {
                resultDiv.innerHTML = "An error occurred";
            }
            return;
        }

        const user = await response.json();

        resultDiv.innerHTML = `
        <div>
            <img src="${user.avatar_url}" alt="Avatar" width="200" height="200"> 
            <p>Name: ${user.name}</p>
            <p>Repos: ${user.public_repos}</p>
            <p>Followers: ${user.followers}</p>
            <p>Following: ${user.following}</p>
            <p></p>GitHub Profile: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
        </div>
        `;
        
    });
}


document.addEventListener("DOMContentLoaded", init);