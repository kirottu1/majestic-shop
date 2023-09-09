// document.getElementById('registrationForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//
//     // Get form data
//     const firstName = document.getElementById('firstName').value;
//     const lastName = document.getElementById('lastName').value;
//     const email = document.getElementById('email').value;
//     const phoneNumber = document.getElementById('phoneNumber').value;
//     const password = document.getElementById('password').value;
//
//     // Perform data validation (e.g., check if email is unique, validate password, etc.)
//     if (!validateData(firstName, lastName, email, phoneNumber, password)) {
//         return; // Don't proceed with registration if data is invalid
//     }
//
//     // Create a new user object
//     const newUser = {
//         type: 'user',
//         name: `${firstName} ${lastName}`,
//         email: email,
//         phone: phoneNumber,
//         password: password
//     };
//
//     // Store the new user data in localStorage (or you can use sessionStorage)
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//
//     // Registration successful, you can now redirect or show a success message
//     console.log('Registration successful');
// });
//
// // Function to validate user data (you can add more validation logic)
// function validateData(firstName, lastName, email, phoneNumber, password) {
//     // Example validation: Check if email is unique
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const existingUser = users.find(user => user.email === email);
//     if (existingUser) {
//         alert('Email is already in use. Please choose a different email.');
//         return false;
//     }
//
//     // You can add more validation logic here (e.g., password strength)
//
//     // Data is valid
//     return true;
// }
