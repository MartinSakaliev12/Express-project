import bodyParser from "body-parser"
import express from "express"
import router from "./crudControler.js"
import sequelize from "./database.js"

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use(router)

sequelize.sync().then(
    result =>{
        console.log(result);
        app.listen(3000,()=>{
        console.log("app is listening on http://localhost:3000")
        })
    }
)
.catch(err => console.log(err))



