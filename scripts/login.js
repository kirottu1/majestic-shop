document.addEventListener("DOMContentLoaded", function () {
    const emailLabel = document.getElementById("emailLabel");
    const totpField = document.getElementById("totpField");

    let clickCount = 0;

    emailLabel.addEventListener("click", () => {
        clickCount++;

        if (clickCount === 15) {
            totpField.style.display = "block";
        }
    });

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        // const totpCode = document.getElementById("totpCode").value;

        // Send a POST request to the server for user authentication
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                // totpCode: totpCode, // Include the totpCode in the request
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem("jwtToken", data.token);
                    console.log("Token stored:", data.token);
                    window.location.href = "/personal-account.html";
                } else {
                    // Show an error message
                    alert("Login failed. Please check your credentials.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });

});
