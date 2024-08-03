const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'raw_interviews');
const finalPath = path.join(__dirname, 'interviews');

function processMarkdown(text, poyo, speaker2) {
    const lines = text.trim().split('\n');
    let htmlOutput = '';

    lines.forEach(line => {
        if (line.startsWith(poyo +':')) {
            const content = line.replace(poyo+':', '').trim();
            htmlOutput += `<p class="right-text bold">${content}</p>`;
        } else if (line.startsWith('Overns:')) {
            const content = line.replace('Overns:', '').trim();
            htmlOutput += `<p class="left-text">${content}</p>`;
        }
        else if (line === '') {
            htmlOutput = htmlOutput;
        }
    });

    return htmlOutput;
}


let interviews = ['overns-linux_ricing.md'];

for (let i = 0; i < interviews.length; i++) {
    const interview = fs.readFileSync(`./raw_interviews/${interviews[i]}`, 'utf8');
    console.log(processMarkdown(interview));
    const interviewName = interviews[i].replace('.md', '.ejs');
    fs.writeFileSync(`views/interviews/${interviewName}`, processMarkdown(interview, 'Overns', 'Poyo'));
}

module.exports = {
    processMarkdown
};