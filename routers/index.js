const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

// middleware that is specific to this router

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })
// // define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// // define the about route
// router.get('/about', (req, res) => {
//   res.send('About birds')
// })

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

/**
 * 
 * 
 * opsi lain -> edit profile kayanya ga seribet edit post
 * get /profiles/:profileId/edit controller.editProfileForm
 * post /profiles/:profileId/edit controller.updateProfile
 * 
 * 
 */

module.exports = router