const fs = require('fs');
const path = require('path');

const markdownText = ``;
const directoryPath = path.join(__dirname, 'interviews');
const finalPath = path.join(__dirname, 'interviews_html');

// Llegeix tots els fitxers del directori
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // Filtra només els fitxers amb extensió .md
    const markdownFiles = files.filter(file => path.extname(file) === '.md');

    // Mostra la llista de fitxers
    console.log('Markdown files:', markdownFiles);

    // Processa cada fitxer
    markdownFiles.forEach(file => {
        const interview = fs.readFileSync(path.join(directoryPath, file), 'utf8');
        console.log(processMarkdown(interview));
        fs.openSync(path.parse(file).name + '.html', 'w');

    });
});

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


let interviews = ['overns - linux ricing.md'];

for (let i = 0; i < interviews.length; i++) {
    const interview = fs.readFileSync(`interviews/${interviews[i]}`, 'utf8');
    console.log(processMarkdown(interview));
}