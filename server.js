const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const path = require('path');
const api_routes = require('./routes/api_routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use('/api', api_routes);

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (request, response) => {
    response.sendFile(__dirname + '/public/notes.html');
});
        
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)})