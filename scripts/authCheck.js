document.addEventListener("DOMContentLoaded", () => {
    const welcomeMessage = document.getElementById("welcomeMessage");
    const storedUsername = localStorage.getItem('username');
    welcomeMessage.textContent = `Welcome back, ${storedUsername}.`;
    if (storedUsername === null) {
        window.location.href = "/login.html";
    }
});



const logoutBtn = document.querySelector('#logoutButton');
logoutBtn.addEventListener('click', onLogoutBtnClick);

function onLogoutBtnClick() {
    const confirmSignout = confirm('Are you sure you want to sign out?');

    if (confirmSignout) {
        API_AUTH.signout()
            .then(response => {
                alert('Signout successful');
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                window.location.href = '/login.html';
            })
            .catch(error => {
                alert('Signout failed. Please try again.');

                console.error('Signout error:', error);
            });
    }
}