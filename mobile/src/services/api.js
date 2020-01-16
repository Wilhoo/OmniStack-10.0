/*import axios from 'axios';

const api = axios.create({
    //baseURL: 'https://192.168.1.55:3333',
    baseURL: 'https://localhost:3333'
});

export default api; */

import axios from 'axios';

function api() {
    const baseURL = 'http://192.168.1.55:3333';

    if (baseURL.startsWith('http://<')){
        let redStr = "\x1b[31m";
        console.error(redStr + "ERRO! Você não configurou o Servidor ainda!");
        console.error(redStr + "Adicione o seu endereço:3333 (Backend) no arquivo api.js! (Por exemplo http://192.168.1.5:3333)");
        return;
    }

    return axios.create({ baseURL })
}

export default api();