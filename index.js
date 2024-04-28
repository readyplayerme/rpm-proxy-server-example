const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const PORT = 3000;
const HOST = "localhost";
const API_KEY = ""; // ADD YOUR API KEY HERE
const API_SERVICE_URL = "https://api.readyplayer.me";

function authCheck() {
    // ADD YOUR CUSTOM AUTHORIZATION LOGIC HERE
    return true;
 }

 app.use('', (req, res, next) => {
    if (authCheck()) {
        next();
    } else {
        res.sendStatus(403);
    }
 });

app.use('', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    headers: {
        'x-api-key': API_KEY
    }
 }));

 app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });