const express = require('express');
const interviewProcesser = require('./interviewProcesser');   
const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, 'posts.json');
const rawPostsData = fs.readFileSync(postsFilePath, 'utf8');
const postsArray = JSON.parse(rawPostsData).map(post => JSON.parse(post));

const app = express();
const port = 3000;
const interviewLocation = 'views/interviews';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    console.log("hit-main page! " + req.ip);
    res.render('index', {"posts" : postsArray });
});

app.get('/interviews/:name', (req, res) => {
    const name = req.params.name;
    console.log("hit! " + name + " " + req.ip);
    res.render("interview", { name: "interviews/"+name });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});