const regButton = document.querySelector("#regSubmitBtn");
const regForm = document.forms.registrationForm;

regButton.addEventListener('click', onRegBtnClick)

function onRegBtnClick(){
    const regFormData = new FormData(regForm);
    API_AUTH.register(regFormData.get('username'), regFormData.get('email'), regFormData.get('password'))
        .then(data => {
            alert('Registration successful, you are getting redirected on login page')
        console.log('Registration successful:', data);
        // Handle the response data here
            window.location.href = '../login.html';
    })
    .catch(error => {
        console.error('Registration error:', error);
        // Handle errors here
    });
}