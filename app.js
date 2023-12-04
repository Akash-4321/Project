const cors = require("cors");
const config = require("./config")[process.env.NODE_ENV]
const db = require("./loders/mongodb")
const dotenv = require('dotenv');
const express = require("express");
const fs = require("fs");

let app = express()
app.use(express.json()) 
app.use(cors()) 
app.use(express.urlencoded({extended: false})) 
app.use(express.static("public"));

let routes = fs.readdirSync('./routes')
for (const index in routes) {
    app.use(require(`./routes/${routes[index]}`))
}

app.use((req, res, next) => {
    let resBody = {
        success: false,
        message: 'Resource not found'
    }
    res.status(404).json(resBody)
})

app.use((err, req, res, next) => {
    let resBody = {
        success: false,
        message: 'Internal server error'
    }
    res.status(500).json(resBody)
})

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`       Server running on port ${PORT}`);
});


// db.createUser(
//        {
//          user: "mongoadmin",
//          pwd: "mongoadmin",
//          roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
//        }
//      )


// db.createUser(
//     {
//         user:"taskManageUser", 
//         pwd : "TaskManageDemo",
//         roles: [
//             {
//                 db: "taskManageDB", // db name 
//                 role : "dbOwner" // owner of the db 
//             }
//         ]
//     })