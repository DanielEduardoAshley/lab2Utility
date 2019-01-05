const fs = require('fs');
// const FILE_NAME = 'users.txt'

const save = (FILE_NAME, dataLoad, cb) => {
    console.log('IN function save', dataLoad)
    let newStr =''
    // const data = JSON.stringify(dataLoad)
    for(let i=0; i < dataLoad.students.length ; i++){
        if(i !== dataLoad.students.length-1 ){
             newStr = newStr + JSON.stringify(dataLoad.students[i]) + ',' + '\n'
        }
        else{
             newStr = newStr + JSON.stringify(dataLoad.students[i]) + '\n'
        }
    }
    const newObject =  `{ "students" : \n [${newStr}]}`
    // const newArr = []

    // for(let data of dataLoad.students){
    //     newArr.push(toString(data + '\n'))

    // }
    // const newNewArr = toString(newArr)
    // const dataOne = `{ "student" : ${newNewArr}}`
    // console.log( dataOne)

    fs.writeFile(FILE_NAME, newObject, (newObjects, err) => {
        cb(newObject,err)
    })
   
};

const load = (FILE_NAME, cb) => {
    if(!FILE_NAME){
    console.log('mistake')
        return
    }
    console.log('why!!!!')
    fs.readFile(FILE_NAME, 'UTF8', (err, data) => {
        if (!data) {
            
            cb([])
            console.log('hello')
            return;
            
        }
       
      
        console.log('this is some data', data)
        const dataLoad = JSON.parse(data)
        cb(dataLoad)
        
    })
}

// const add = (FILE_NAME, objectOne, cb) => {
//     // load existing content
//     // update with new row
//     // save new content
//     // if(!FILE_NAME){
//     //  save(FILE_NAME, objectOne, (newObject, err)=>{
//     //     if(err){
//     //         res.send('there was an error')
//     //     }else{
//     // res.json('hello')
//     //         return
//     //     }


//     //  })
//     //  }
    
    
    
    



//     load(FILE_NAME, dataLoad=> {
//         console.log('dataload',dataLoad)
//         if(dataLoad.length === 0){
//             const newObj = JSON.stringify(objectOne)
//             const newObject =  `{ "students" : \n [${newObj} \n]}`
//             console.log(newObj)
//             fs.writeFile(FILE_NAME, newObject, (dataLoad, err) => {
//                 cb(dataLoad, err)
//                 console.log('hello')    
//             })

//         }
//         else{
//             dataLoad.students.push(objectOne)
//             console.log("the data" , dataLoad)
//             save(FILE_NAME, dataLoad, (something, err) => {

//             // we done - new content saved
//             if(err){
//                 console.log('there was an error')
//             }
//                 console.log('What is this', something)
//                 cb(dataLoad, err) 
//             })
//         }
       
//     })
// }





const add = (FILE_NAME, objectOne, cb) => {
    
    
    let check = true
    



    load(FILE_NAME, dataLoad=> {
        console.log('dataload',dataLoad)
        if(dataLoad.length === 0){
            const newObj = JSON.stringify(objectOne)
            const newObject =  `{ "students" : \n [${newObj} \n]}`
            console.log(newObj)
            fs.writeFile(FILE_NAME, newObject, (dataLoad, err) => {
                cb(dataLoad, err)
                console.log('hello')    
            })
            check = true
        }
        else 
        {
            for(let i = 0 ; i< dataLoad.students.length ; i++){
                if(dataLoad.students[i].name === objectOne.name){ if(objectOne.age !== dataLoad.students[i].age || objectOne.city.toUpperCase() !== dataLoad.students[i].city.toUpperCase() || parseInt(objectOne.grade) !== parseInt(dataLoad.students[i].grade)){
                    console.log('success')
                    dataLoad.students[i].age = objectOne.age
                    dataLoad.students[i].city = objectOne.city
                    dataLoad.students[i].grade = objectOne.grade
                    check = false
                    console.log('close')
                    save(FILE_NAME, dataLoad, (something, err) => {

                        // we done - new content saved
                        if(err){
                            console.log('there was an error')
                        }
                            console.log('What is this', something)
                            cb(dataLoad, err) 
                        })

                }
                }else{
                    check = true
                }
        }
    }
        

        
            
             
        if(check === true){ 
            // objectOne.age !== data.age || objectOne.city.toUpperCase() !== data.city.toUpperCase() || parseInt(objectOne.grade) !== parseInt(data.grade)
            console.log('bingo',objectOne.age)
            dataLoad.students.push(objectOne)
            console.log("the data" , dataLoad)
            save(FILE_NAME, dataLoad, (something, err) => {

            // we done - new content saved
            if(err){
                console.log('there was an error')
            }
                console.log('What is this', something)
                cb(dataLoad, err) 
            })
        
        }
    })
}
       
    


// data.students.push(JSON.stringify(res.query))
// res.send({'added' : res.query,'classes' : className } )
// res.send(data)

module.exports = {
    save,
    load,
    add,
}