const logButton = document.querySelector("#logSubmitBtn");
const logForm = document.forms.loginForm;

logButton.addEventListener('click', onLogBtnClick)

function onLogBtnClick(){
    const logFormData = new FormData(logForm);
    API_AUTH.login(logFormData.get('username'), logFormData.get('password'))
        .then(data => {
            alert('You are getting redirected to personal account')
            console.log('Login successful:', data);
            const { username } = data;
            const { email } = data;
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            window.location.href = 'personal-account.html';
        })
        .catch(error => {
            console.error('Login error:', error);
        });
}