const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'raw_interviews');
const finalPath = path.join(__dirname, 'interviews');

function processMarkdown(text) {
    const lines = text.trim().split('\n');
    const title = lines[0].replace('#', '').trim();
    const subtitle = lines[1].replace('##', '').trim();
    let htmlOutput = `<h1 class="title">${title}</h1><h2 class='subtitle bottom-border'>${subtitle}</h2>\n`;
    htmlOutput += `<meta name="title" content="${title}"><meta name="description" content="${subtitle}"><meta name="keywords" content="Poyo, Dapoyo, the poyo reporter, reporter, news, tutorial"><meta name="author" content="Poyo!"></meta>`;
    raw_users = lines[2].replace('###', '').trim();
    let interviewer = raw_users.split(',')[0];
    let interviewee = raw_users.split(',')[1];
    lines.forEach(line => {
        if (line.startsWith("Poyo:")) {
            line = line.replace((interviewer + ":"), "");
            htmlOutput += `<p class="right-text bold">${line} :<span class="red">${interviewer}</span></p>\n`;
        } else if (line.startsWith("Overns:")) {
            line = line.replace((interviewee + ":"), "");
            htmlOutput += `<p class="left-text"><span class="bold">${interviewee}:</span>${line}</p>\n`;
        }
    });
    return htmlOutput;
}


let interviews = ['overns-linux_ricing.md'];

for (let i = 0; i < interviews.length; i++) {
    const interview = fs.readFileSync(`./raw_interviews/${interviews[i]}`, 'utf8');
    const interviewName = interviews[i].replace('.md', '.ejs');
    fs.writeFileSync(`views/${interviewName}`, processMarkdown(interview, 'Overns', 'Poyo'));
}

module.exports = {
    processMarkdown
};