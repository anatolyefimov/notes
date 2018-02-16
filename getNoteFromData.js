function makeNote(noteProp, i) {
    let note = document.createElement('div');
    note.classList.add('note');
    note.classList.add(noteProp.color);

    if (noteProp.image) {
        let image_container = document.createElement('div');
        image_container.classList.add('img-container');

        let img = document.createElement('img');
        img.setAttribute('src', noteProp.image.toString());

        image_container.appendChild(img);
        note.appendChild(image_container);
    }

    let del = document.createElement('div')
    let line1 = document.createElement('div')
    let line2 = document.createElement('div')
    del.classList.add('delete')
    line1.classList.add('line1')
    line2.classList.add('line2')
    del.appendChild(line1)
    del.appendChild(line2)
    del.addEventListener('click', () => {
        del.parentElement.remove()

        let xhr = new XMLHttpRequest()
        let ind = del.parentElement.getAttribute('ind')

        xhr.open('POST', 'http://localhost:8080/' + ind)
        xhr.send()

    })
    note.appendChild(del)

    let pen = document.createElement('div')
    pen.classList.add('edit')
    pen.textContent = String.fromCharCode(9998)
    pen.addEventListener('click', () => {
        fillingEdit(pen)
    })
    note.appendChild(pen)

    let note_contents = document.createElement('div');
    note_contents.classList.add('note-contents');
     
    let header = document.createElement('div');
    header.classList.add('header');
    header.textContent = noteProp.title;

    let content = document.createElement('div');
    content.classList.add('content');
    content.textContent = noteProp.content;

    note_contents.appendChild(header);
    note_contents.appendChild(content);

    note.setAttribute('ind', i)

    note.appendChild(note_contents);

    return note;    

}


let typePriority = document.querySelector('.priority .notes-container')
let typeNormal = document.querySelector('.normal .notes-container')


for (let i = 0; i < data.length; ++i) {
    let root = (data[i].group === 'priority') ? typePriority : typeNormal;
    root.appendChild(makeNote(data[i], i)); 
}