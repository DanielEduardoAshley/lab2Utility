const {save, load, add} = require('./user');
// same as:
// const FileDb = require('./user);
// const save = FileDb.save
// const load = FileDb.load
// const add = FileDb.add

const express = require('express');
const app = express();
const port = 3000;



app.get('/class/add', (req, res) => {
    
    const {query} = req;
    const {name, age, city, grade} = query;
    const classes = req.query.class
    console.log(classes)
    const FILE_NAME = `${classes}.json`
    const newObj = {'name':name, 'age':age, 'city':city, 'grade':grade} 
    console.log("testing",newObj)
    console.log(name, age, city, grade)
    if(!name || !age || !city || !grade){
        res.json({ 
            'error' : 'Please fill out all the information for the student', 
        
        })
    }

    add(FILE_NAME, newObj, (dataLoad, err) => {
        console.log("this", newObj)
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }
        console.log("cool", newObj)
        res.contentType('json')
        res.json({ added : newObj,
              class : classes });
     
    })
    

});

// app.get('/class/save', (req, res) => {
//     const {query} = req;
//     const {name, age, city, grade} = query;
//     const classes = req.query.class
//     const FILE_NAME = `${classes}.json`

    
//     save(FILE_NAME, {name, age, city, grade}, (newObject , err)=>{
//         if (err) {
//             res.status(500)
//             res.json({
//                 'message': "something went wrong!",
//                 "err": err,
//             });
//             return;
//         }

//         res.json({
//             "message": "success",
//         });



//     })
// });



app.get('/class/list', (req, res) => {
    const classes = req.query.class
    const FILE_NAME = `${classes}.json`
    console.log(FILE_NAME)


    load(FILE_NAME, (dataLoad, err)=>{
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }
        if(dataLoad.length === 0){
            res.json({ 
                'error' : "Class physicslol doesn't exist."
              })
        }
        else{
            console.log('it', dataLoad)
            res.json(dataLoad)        

        }
       


    })
   

})



app.get('/class/listfailing', (req, res) => {
    const classes = req.query.class
    const FILE_NAME = `${classes}.json`
    load(FILE_NAME, (dataLoad, err)=>{
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }
        if(dataLoad.length === 0){
            res.json({ 
                'error' : `Class ${req.query.class} doesn't exist.`
              })
        }
        else{
            const newArr = []
            console.log(typeof dataLoad)
            for(let data of dataLoad.students){
                if(parseInt(data.grade) < 50){
                    newArr.push(data)
                }
            }
            res.json({students: newArr }) 

        }
       

       


    })
})

app.get('/class/listfromcity', (req, res) => {
    const classes = req.query.class
    const FILE_NAME = `${classes}.json`
    // res.send('called LOAD')
    load(FILE_NAME, (dataLoad, err)=>{
        if (err) {
            res.status(500)
            res.json({
                'message': "something went wrong!",
                "err": err,
            });
            return;
        }

        if(dataLoad.length === 0){
            res.json({ 
                'error' : `Class ${req.query.class} doesn't exist.`
              })
        }
        else{
            const newArr = []
            console.log(typeof dataLoad)
            for(let data of dataLoad.students){
                if(req.query.city.toUpperCase() === data.city.toUpperCase()){
                    newArr.push(data)
                }
            }
            res.json({students: newArr }) 

        }


    })
})


app.listen(port, () => {
    console.log(`listening at port ${port}`)
});