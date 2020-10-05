
import Echo from "laravel-echo";
import {urlSite} from "./api";

let token = localStorage.getItem("token_copsycho");
window.io = require('socket.io-client');

window.Echo = new Echo({
    broadcaster: 'socket.io',
    host: `${urlSite}:6001`,
    encrypted: false,
    auth: {
        headers: {
            "Authorization":`Bearer ${token}`
        },
    }
});

