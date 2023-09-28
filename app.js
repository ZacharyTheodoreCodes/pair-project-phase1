const express = require('express')
const app = express()
const port = 3000
const router = require('./routers')
//const { Post, Tag, PostTag } = require('./models')

// app.get('/', (req, res) => {
//   Tag
//   .findAll({
//     include : {model : Post}
//   })
//   .then((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     res.send(err)
//   })
// })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})