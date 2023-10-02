document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const storedUsername = localStorage.getItem('username');
    welcomeMessage.textContent = `Welcome back, ${storedUsername}.`;
    if (storedUsername === null){
        window.location.href = "/login.html"; // Replace with your login page URL
    }
    // API_AUTH.getUserData()
    //     .then((data) => {
    //         console.log("User is logged in");
    //         // User is logged in, show the personal account content
    //         // if (data.username) {
    //         //     // Update the content of the <h1> element with the username
    //         //     const welcomeMessage = document.getElementById("welcomeMessage");
    //         //     welcomeMessage.textContent = `Welcome back, ${data.username}`;
    //         // }
    //     })
    //     // .catch((error) => {
    //     //     console.error("Error checking login status:", error);
    //     //     // User is not logged in, redirect to the login page
    //     //     console.log("User is not logged in, redirecting...");
    //     //     window.location.href = "/login.html"; // Replace with your login page URL
    //     // });
});



const logoutBtn = document.querySelector('#logoutButton');
logoutBtn.addEventListener('click', onLogoutBtnClick);

function onLogoutBtnClick() {
    // Display a confirmation alert to confirm signout
    const confirmSignout = confirm('Are you sure you want to sign out?');

    if (confirmSignout) {
        // Initiate the signout process
        API_AUTH.signout()
            .then(response => {
                // Display a success message
                alert('Signout successful');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                // Redirect to the login page or perform other actions as needed
                window.location.href = '/login.html'; // Replace with your actual login page URL
            })
            .catch(error => {
                // Display an error message
                alert('Signout failed. Please try again.');

                // Log the error to the console for debugging
                console.error('Signout error:', error);
            });
    }
}