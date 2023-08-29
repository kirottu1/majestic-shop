class API{
    static URL = 'http://localhost:3000/stock';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-type': 'application/json; charset=UTF-8'
    };

    static getList() {
        return fetch(`${this.URL}`, {
            headers: this.HEADERS,
        })
            .then((res) => res.json())
    }
}