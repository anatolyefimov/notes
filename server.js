
const express = require('express')
const app = express()

const fs = require('fs')

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use(express.static('./'))

app.get('/', (request, response) => {
    response.sendfile('index.html')
})

app.post('/', (request, response) => {
    let data = fs.readFileSync('./data.js', 'utf-8')
    let body = request.body
    data = data.substring(data.indexOf("=") + 1)
    data = JSON.parse(data)
    data.push(body)
    data = JSON.stringify(data)
    fs.writeFileSync('./data.js', 'let data = ' + data)
  
})

app.post('/:ind', (request, response) => {
    let data = fs.readFileSync('./data.js', 'utf-8')
    
    let ind = Number(request.params.ind)

    data = data.substring(data.indexOf("=") + 1)
    data = JSON.parse(data)
   
    data.splice(ind, 1)
    data = JSON.stringify(data)
  
    fs.writeFileSync('./data.js', 'let data = ' + data)
} )

app.post('/edit/:ind', (request, response) => {
    let data = fs.readFileSync('./data.js', 'utf-8')
    
    let ind = Number(request.params.ind)

    data = data.substring(data.indexOf("=") + 1)
    data = JSON.parse(data)

    let obj = request.body
    console.log(obj) 
   
    data[ind] = obj

    data = JSON.stringify(data)
    fs.writeFileSync('./data.js', 'let data = ' + data)

})

app.listen(8080)