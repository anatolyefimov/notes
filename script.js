let newNote = document.querySelector('.new-note');
let newHeader = document.querySelector('.new-header');
let newContent = document.querySelector('.new-content');
let add = document.querySelector('.add');
let newColors = document.querySelector('.new-note').querySelectorAll('.color');
let editColors = document.querySelector('.edit-note').querySelectorAll('.color');
let tools = document.querySelector('.tools');
let newPriorityTypes = document.querySelector('.new-note').querySelectorAll('.priority-type');
let editPriorityTypes = document.querySelector('.edit-note').querySelectorAll('.priority-type');

document.body.addEventListener('click', function(event) {
    if (event.target.parentElement != newNote && event.target.parentElement != tools                
        && event.target.parentElement.parentElement != tools && event.target != newNote) {
        newHeader.style.display = 'none';
        tools.style.display = 'none';
    }
})

let deletingIcons = document.querySelectorAll('.delete');

for (let deletingIcon of deletingIcons) {
    deletingIcon.addEventListener('click', function() {
        this.parentElement.remove();
    })
}

let editButtons = document.querySelectorAll('.edit')


function fillingEdit(edit) {
    document.querySelector('.editing-area').style.display = 'flex';
    
    let newHeader = document.querySelector('.edit-header');
    let newContent = document.querySelector('.edit-content');
    let newImage = document.getElementById('edit-image');
    let note = edit.parentElement;
    let group = note.parentElement.parentElement.classList[1];
    let image;
    if (note.querySelector('.img-container') != null)
        image = note.querySelector('.img-container').firstChild;
    let header = note.querySelector('.header');
    let content = note.querySelector('.content');
    let color = note.classList[1];
    newHeader.textContent = header.textContent;
    newContent.textContent = content.textContent;
    if (group == 'priority') {
        document.getElementById('priority').style.backgroundColor = 'rgb(200, 200, 200)';
        document.getElementById('normal').style.backgroundColor = 'inherit'
    }
    else {
        document.getElementById('priority').style.backgroundColor = 'inherit'
        document.getElementById('normal').style.backgroundColor = 'rgb(200, 200, 200)';
    }
    if (image != null)
        newImage.value = image.getAttribute('src');
    else {
        newImage.value = '';
    }
    let colors = editColors;
    console.log(color)
    for (let i = 0; i< 4; ++i) {
        if (colors[i].classList[1] != color)
            colors[i].style.borderColor = 'white';
        else 
            colors[i].style.borderColor = 'rgb(150, 150, 150)';
    }


    let id = note.getAttribute('id')
    document.querySelector('.done').setAttribute('from', id)

}

for (let edit of editButtons) {
    edit.addEventListener('click', function() {
        fillingEdit(edit);
    });
}

function saveChanges(doneEdit) {
    let note = document.getElementById(doneEdit.getAttribute('from')) 
    let header = note.querySelector('.header')
    let content = note.querySelector('.content')
    let image
    if (note.querySelector('.img-container') != null) 
        image = note.querySelector('.img-container').children[0]
    let editNote = doneEdit.parentElement.parentElement
    let editColor;
    let colors = editNote.querySelectorAll('.color')
    for (let i = 0;  i< 4; ++i) {
        if (colors[i].style.borderColor == 'rgb(150, 150, 150)') {
            editColor = colors[i].classList[1]
        }
    }
    let editImage  = document.getElementById('edit-image').value;

    header.textContent = editNote.querySelector('.edit-header').textContent;
    content.textContent = editNote.querySelector('.edit-content').textContent;
    note.classList.replace(note.classList[1], editColor)
    if (editImage != '') {
        if (note.querySelector('.img-container') == null) {
            let imageContainer = document.createElement('div')
            imageContainer.classList.add('img-container')
            note.insertBefore(imageContainer, note.children[0])
        }
        let img = document.createElement('img')
        img.setAttribute('src', editImage)
        if (note.querySelector('.img-container').firstChild != null)
            note.querySelector('.img-container').firstChild.remove()
        note.querySelector('.img-container').appendChild(img)

    }
    else {
        let imageContainer = note.querySelector('.img-container')
        if (imageContainer != null) {
            imageContainer.remove();
        }
    }

    let priority = note.parentElement.parentElement.classList[1];
    let editPriority =  editNote.querySelectorAll('.priority-type')[0].style.backgroundColor == 'rgb(200, 200, 200)'  
        ? 'priority'
        : 'normal'
    if (priority != editPriority) {
        let root = document.querySelector('.' + editPriority + ' .notes-container')
        root.appendChild(note)
    
    }

    editNote.parentElement.style.display = 'none';
}

let doneEdit = document.querySelector('.done')

doneEdit.addEventListener('click', function() {
    saveChanges(doneEdit)

})

newContent.addEventListener('focus', function() {
    newHeader.style.display = 'block';
    tools.style.display = 'flex';
})


newPriorityTypes[0].addEventListener('click', function() {
    newPriorityTypes[0].style.backgroundColor = 'rgb(200, 200, 200)'
    newPriorityTypes[1].style.backgroundColor = 'inherit'
})

newPriorityTypes[1].addEventListener('click', function() {
    newPriorityTypes[1].style.backgroundColor = 'rgb(200, 200, 200)'
    newPriorityTypes[0].style.backgroundColor = 'inherit'
})

editPriorityTypes[0].addEventListener('click', function() {
    editPriorityTypes[0].style.backgroundColor = 'rgb(200, 200, 200)'
    editPriorityTypes[1].style.backgroundColor = 'inherit'
})

editPriorityTypes[1].addEventListener('click', function() {
    editPriorityTypes[1].style.backgroundColor = 'rgb(200, 200, 200)'
    editPriorityTypes[0].style.backgroundColor = 'inherit'
})

for (let i = 0; i < editColors.length; ++i) {
    editColors[i].addEventListener('click', function(){ 
        editColors[i].style.borderColor = 'rgb(150, 150, 150)'
        for (other of editColors) {
            if (other != editColors[i]) {
                other.style.borderColor = 'white';
            }
        }
    })
}

for (let i = 0; i < newColors.length; ++i) {
    newColors[i].addEventListener('click', function(){ 
        newColors[i].style.borderColor = 'rgb(150, 150, 150)'
        for (other of newColors) {
            if (other != newColors[i]) {
                other.style.borderColor = 'white';
            }
        }
    })
}


let counter = 4;
let priority = document.querySelector('.priority .notes-container')
let normal = document.querySelector('.normal .notes-container');

add.addEventListener('click', function() {
    ++counter;
    let root = newPriorityTypes[0].style.backgroundColor == 'rgb(200, 200, 200)' 
        ? priority
        : normal;
    let color
    for (col of newColors) {
        if (col.style.borderColor == 'rgb(150, 150, 150)') {
            color = col.classList[1];
        }
    }

    let note = document.createElement('div')
    note.classList.add('note');
    note.classList.add(color);

    let deletingIcon = document.createElement('div');
    deletingIcon.classList.add('delete');
    let line1 = document.createElement('div');
    let line2 = document.createElement('div');
    line1.classList.add('line1');
    line2.classList.add('line2');
    deletingIcon.appendChild(line1);
    deletingIcon.appendChild(line2);
    deletingIcon.addEventListener('click', function() {
        this.parentElement.remove();
    })
    note.appendChild(deletingIcon);
    
    let noteContents = document.createElement('div');
    noteContents.classList.add('note-contents');

    let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');

    let image = document.createElement('img');
    image.setAttribute('src', document.getElementById('new-image').value );
    imageContainer.appendChild(image);
    if (document.getElementById('new-image').value != '') {
        note.appendChild(imageContainer);
    }   

    let header = document.createElement('div');
    header.classList.add('header');
    header.textContent = newHeader.textContent;

    let content = document.createElement('div');
    content.classList.add('content');
    content.textContent = newContent.textContent;

    noteContents.appendChild(header);
    noteContents.appendChild(content);
    note.appendChild(noteContents);

    let edit = document.createElement('div')
    edit.classList.add('edit')
    edit.textContent = String.fromCharCode(9998);
    edit.addEventListener('click', function() {
        fillingEdit(edit);
    })

    note.appendChild(edit);
    note.setAttribute('id', 'id' + counter);

    root.appendChild(note);
    newHeader.textContent = '';
    newContent.textContent = '';
    newHeader.style.display = 'none';
    tools.style.display = 'none';
    for (other of newColors) {
        other.style.borderColor = 'white';
    }
    newColors[0].style.borderColor = 'rgb(150, 150, 150)'
    newPriorityTypes[0].style.backgroundColor = 'rgb(200, 200, 200)'
    newPriorityTypes[1].style.backgroundColor = 'inherit'
    document.getElementById('new-image').value = '';
})

