import axios from 'axios'

const ENDPOINT = "https://dql2agy2kzgx7ascv67kfppjdm.appsync-api.us-east-1.amazonaws.com/graphql";

const API = axios.create({
    baseURL: ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'da2-stz4qcnsgrg6phgtgqmtg5jkoq'
    }
});

export {
    ENDPOINT,
    API
};

export default API;