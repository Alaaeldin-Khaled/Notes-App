const { default: chalk } = require('chalk');
const fs = require('fs');


const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    debugger;

    if (duplicateNote) {
    console.log(chalk.red.inverse('Note Title Taken!'));
    

} else {
    notes.push({
        title: title,
        body: body
    })
    saveNotes(notes);
    console.log(chalk.green.inverse('New Note Added!'));
    }
};

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    saveNotes(notesToKeep);
    if (notesToKeep.length === notes.length) {
        console.log(chalk.red.inverse('no note found!'));
    } else {
        console.log(chalk.green.inverse('Note Removed!'));
    }
};




const saveNotes = (notes) => {
    dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const BufferedData = fs.readFileSync('notes.json');
        const parsedData = BufferedData.toString();
        return JSON.parse(parsedData);
    } catch (e) {
        return []
    }
    
};

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.cyan.inverse('Your Notes'));
    notes.forEach((note) => {
        console.log(chalk.green(note.title));
    })
};

const readNote = (title) => {
    const notes = loadNotes();
    const wantedNote = notes.find((note) => title === note.title)
    
    if (wantedNote) {
        console.log(chalk.bgCyanBright(wantedNote.title));
        console.log(wantedNote.body);
    }
    else {
        console.log(chalk.bgRedBright('Note not found'));
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};