const note_router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db_path = path.join(__dirname, '../db/notes.json');

function getNoteData () {
    
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data))
}

note_router.get('/notes', (req,res) => {
    getNoteData()
        .then(note_data => {

            res.json(note_data)
        })
        .catch(err => console.log(`There was an error in get\n${err}`))
})


note_router.post('/notes', (req,res) => {
    getNoteData()
        .then(note_data => {
            const new_note = req.body;
            const reference_id = note_data.length ? note_data[note_data.length - 1].id : 0;
            new_note.id = parseInt(reference_id) + 1;

            console.log(new_note, reference_id)  //***//  added

            note_data.push(new_note);

            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => res.json(note_data))
                .catch(err => console.log(`There was an error in post ${err}`));
        })
});

note_router.delete('/notes', (req,res) => {
    getNoteData()
        .then(notes => {
            console.log(notes);
            console.log(req)
            const id = req.body.id;
            const obj = notes.find(note => note.id === id);
            const index = notes.indexOf(obj);

            console.log(`id:${id}`)
            console.log(obj)
            console.log(index)

            notes.splice(index,1);

            fs.promises.writeFile(db_path, JSON.stringify(notes, null, 2))
                .then(() => {
                    console.log('notes succesfully updated')
                    res.json(notes)})
                .catch(err => console.log(`there was an error in delete\n${err}`))
        })
})

// note_router.get('/todos/:id/', (req,res) => {   //the :id is a placeholder in the url for 
//     console.log(req.params.id)  //request.params grabs whatever is put in the placeholder and returns it

// }) 

module.exports = note_router;

