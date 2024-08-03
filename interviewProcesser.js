const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'raw_interviews');
const finalPath = path.join(__dirname, 'interviews');

function processMarkdown(text, poyo, speaker2) {
    const lines = text.trim().split('\n');
    const title = lines[0].replace('#', '').trim();
    let htmlOutput = `<h1 class="title">${title}</h1>`;
    htmlOutput += lines[1].replace('##', '<h2>')+'</h2>';
    lines.forEach(line => {
        if (line.startsWith("Poyo:")) {
            line = line.replace("Poyo:", "");
            htmlOutput += `<p class="right-text bold">${line} :Poyo!</p>\n`;
        } else if (line.startsWith('Overns:')) {
            htmlOutput += `<p class="left-text">${line}</p>\n`;
        }
    });

    return htmlOutput;
}


let interviews = ['overns-linux_ricing.md'];

for (let i = 0; i < interviews.length; i++) {
    const interview = fs.readFileSync(`./raw_interviews/${interviews[i]}`, 'utf8');
    console.log(interviews[i]);
    const interviewName = interviews[i].replace('.md', '.ejs');
    fs.writeFileSync(`views/${interviewName}`, processMarkdown(interview, 'Overns', 'Poyo'));
}

module.exports = {
    processMarkdown
};