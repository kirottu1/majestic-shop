// auth.js

// Function to send authenticated requests
async function sendAuthenticatedRequest(url, method, body = null) {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        // Handle the case where the token is not available (user is not authenticated)
        return null;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
    };

    const options = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
    };

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            return await response.json();
        } else {
            // Handle error responses here
            return null;
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
