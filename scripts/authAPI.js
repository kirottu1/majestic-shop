class API_AUTH {
    static BASE_URL = 'http://localhost:8080/api/auth';
    static USER_BASE_URL = 'http://localhost:8080/api';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
    };

    static register(username, email, password) {
        const url = `${this.BASE_URL}/signup`;
        const data = { username, email, password, roles: ['user'] };
        return this.post(url, data);
    }

    static login(username, password) {
        const url = `${this.BASE_URL}/signin`;
        const data = { username, password };
        return this.post(url, data);
    }

    static signout() {
        const url = `${this.BASE_URL}/signout`;
        return this.post(url);
    }

    static getUserData() {
        const url = `${this.USER_BASE_URL}/test/user`; // Adjust the endpoint URL as needed
        return this.get(url);
    }

    static post(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: this.HEADERS,
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.json();
            });
    }
    static get(url) {
        return fetch(url, {
            method: 'GET',
            headers: this.HEADERS,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                return response.text();
            });
    }
}