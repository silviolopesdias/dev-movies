import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '68ae92868a0a5859cb3fdb4e2fadea9a',
        language: 'pt-BR',
        page: 1
    }
})

export default api