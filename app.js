/**
 * npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string
 * npx sequelize-cli model:generate --name Profile --attributes username:string,bio:string,UserId:integer
 * npx sequelize-cli model:generate --name Post --attributes ProfileId:integer,imgUrl:string
 * npx sequelize-cli model:generate --name Tag --attributes name:string
 * npx sequelize-cli model:generate --name PostTag --attributes PostId:integer,TagId:string
 * 
 * 
 * 
 * 
 * npx sequelize-cli migration:generate --name addCaptionColumnToPost
 * 
 * npx sequelize-cli seed:generate --name profile-seed
 * 
 */

const express = require('express')
const app = express()
const port = 3000
const router = require('./routers')

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})