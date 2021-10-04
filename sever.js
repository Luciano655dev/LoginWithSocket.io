const express = require("express")
const path = require('path');

const app = express();
const sever = require('http').createServer(app)
const io = require('socket.io')(sever)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res)=>{
    res.render('index.html')
})

var logins = [{username: 'Leticia6555', senha: '654321'}]

io.on('connection',socket=>{
    console.log('SOCKET CONECTADO:' + socket.id)

    socket.on('sendRegister', data=>{
        if(!logins.find(l => l.username === data.username)){
            logins.push({username: data.username, senha: data.senha})
            console.log('Registrado como:'+data.username);
        }else{
            console.log('nome já registrado!');
        }
        //logins.push({username: data.username, senha: data.senha})
    })

    socket.on('sendLogin',data=>{
        if(logins.find(l => l.username === data.username)){
            if(logins.find(s => s.senha === data.senha)){
                console.log('conectado como: '+data.username);
            }else{//
                console.log('senha incorreta!');
            }
        }else{
            console.log('nome não registrado!');
        }
    })
})

sever.listen(3000)