const exp = require('constants');
var express = require('express'); 
var app = express();
var fs = require('fs'); 
const { request } = require('http');

app.use(express.json());

// Если не указан путь, то выводится предупреждение
app.get('/', function(req, res){
    res.end('Add route');
})


// Получить всех студентов
app.get('/students', function(req, res){
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function(err, data){
        res.end(data);
    });
})


// Получить студента по id
app.get('/students/:id', function (req, res) {
    fs.readFile( __dirname + "/" + "students.json", 'utf8', function (err, data) {
       var students = JSON.parse(data);
       var student = students["student" + req.params.id];
       console.log(student);
       res.end(JSON.stringify(student));
    });
 })

// Добавление нового студента
app.post('/students/:id', function(req, res){
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function(err, data){
        const student = req.body;
        data = JSON.parse(data);
        if (data ["student" + req.params.id] == undefined){
        data ["student" + req.params.id] = student;
        console.log(data);
        fs.writeFile(__dirname + "/" + "students.json", JSON.stringify(data), 'utf-8', function(err, data){
            console.log("Студент добавлен (ого, оно работает)");
        });
        res.end(JSON.stringify(data));
    }
    else{
        res.end("Student already added");
    }
    });
})

// Обновление студента
app.put('/students/:id', function(req, res){
    fs.readFile(__dirname + "/" + "students.json", 'utf8', function(err, data){
        var id = req.params.id;
        fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            
            if(req.body.firstName)
                data["student" + id]["firstName"] = req.body.firstName;
            if(req.body.lastName)
                data["student" + id]["lastName"] = req.body.lastName;
            if(req.body.group)
                data["student" + id]["group"] = req.body.group;
            fs.writeFile(__dirname + "/" + "students.json", JSON.stringify(data), 'utf-8', function(err, data){
                console.log("Студент обновлен (ого, оно работает)");
            });

            res.end(JSON.stringify(data));
    });
    })
})

// Удаление студента по id
  app.delete('/students/:id', function (req, res) {
     fs.readFile(__dirname + "/" + "students.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["student" + req.params.id];
        console.log(data);
        res.end(JSON.stringify(data));
        fs.writeFile(__dirname + "/" + "students.json", JSON.stringify(data), 'utf-8', function(err, data){
            console.log("Студент удалён (ого, оно работает)");
        });
        })
     });
 
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Сервер запущен")
})