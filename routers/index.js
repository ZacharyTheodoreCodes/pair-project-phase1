const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')
const UserController = require('../controllers/UserController')

// middleware that is specific to this router

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// // define the home page route
// router.get('/', (req, res) => {
//   res.send('Birds home page')
// })
// // define the about route
// router.get('/about', (req, res) => {
//   res.send('About birds')
// })

router.get('/', Controller.kingsLanding)

router.get('/register', UserController.registerForm)
router.post('/register', UserController.registerPost)

router.get('/login', UserController.loginForm)
router.post('/login', UserController.loginPost)

router.get('/logout', UserController.getlogout)


router.use(function(req, res, next){
  console.log(req.session)
  if(!req.session.UserId){
      const error = 'You are not logged in!'
      res.redirect(`/login?error=${error}`)
  } else{
      next()
  }
})



router.get('/profiles', Controller.showAllProfile)
router.get('/profiles/:profileId', Controller.showProfilePost)
router.get('/profiles/:profileId/edit', Controller.editProfileForm)
router.post('/profiles/:profileId/edit', Controller.updateProfile)
router.get('/profiles/:profileId/posts/add', Controller.addPostForm)
router.post('/profiles/:profileId/posts/add', Controller.createPost)
// router.get('/profiles/:profileId/posts/:postId/edit', Controller.editPostForm)
// router.post('/profiles/:profileId/posts/:postId/edit', Controller.updatePost)
router.get('/profiles/:profileId/posts/:postId/tags/add', Controller.addTagsForm)
router.post('/profiles/:profileId/posts/:postId/tags/add', Controller.createTags)
router.get('/profiles/:profileId/posts/:postId/delete', Controller.deletePost)



module.exports = router