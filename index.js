const express = require('express');
const interviewProcesser = require('./interviewProcesser');   
const path = require('path'); 

const app = express();
const port = 3000;
const interviewLocation = 'interviews';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/interviews/:name', (req, res) => {
    const name = req.params.name;
    res.render("interview", { name: name });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});