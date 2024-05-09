const express = require('express')



const app = express()

app.use(express.json())


const taskcontrollerroutes = require('./routes/Controller')

app.use('/controllerroutes',taskcontrollerroutes)


app.listen(3000||process.env.PORT,function(){
    console.log("aap is running on PORT 3000");
})


