import axios from 'axios'

const ENDPOINT = "https://7i6ffm3gkrhxnpbd5olq53nkwm.appsync-api.us-east-1.amazonaws.com/graphql";

const API = axios.create({
    baseURL: ENDPOINT,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'da2-5edjqbmorveqnlg7mou7bv65fq'
    }
});

export {
    ENDPOINT,
    API
};

export default API;
