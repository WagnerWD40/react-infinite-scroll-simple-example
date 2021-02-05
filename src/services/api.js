import axios from 'axios';

class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com',
        })
    }

    async getTodos(page) {
        try {
            const res = await this.api.get(`/todos?_page=${page}&_limit=10`);
            return res.data;
        } catch (err) {
            console.error(err);
        }
    }
}

export default new Api();