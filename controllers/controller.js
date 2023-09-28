const { Profile,Post,Tag,User } = require("../models")
const { Op } = require("sequelize")

class Controller{
    static showAllProfile(req,res){
        let option = {}
        Profile.findAll(option)
        .then((profileData) => {
            profileData.forEach( data => {
                //console.log(data.gender);
                data.dataValues.fullName = data.fullName
                data.dataValues.genderPronoun = Profile.genderPronoun(data.dataValues.gender)
                data.dataValues.hiddenPhoneNumber = data.hiddenPhoneNumber()

            });
            res.send(profileData)
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static showProfilePost(req,res){
        const {profileId} = req.params;
        let option = {include: [{ model : Post , include: Tag}] }
        option.where = { id : +profileId}
        Profile.findOne(option)
        .then((profileData) => {
            profileData.dataValues.fullName = profileData.fullName
            profileData.dataValues.genderPronoun = Profile.genderPronoun(profileData.dataValues.gender)
            res.send(profileData)
            //res.render("showProfilePost",{profileData})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addPost(req,res){
        
    }

    static createPost(req,res){
        
    }

    static editPostForm(req,res){
        
    }

    static updatePost(req,res){
        
    }

    static addTags(req,res){
        
    }

    static createTags(req,res){
        
    }

    static deletePost(req,res){
        
    }

}

module.exports = Controller
// router.get('/profiles', Controller.showAllProfile)
// router.get('/profiles/:profileId', Controller.showProfilePost)
// router.get('/profiles/:profileId/posts/add', Controller.addPost)
// router.post('/profiles/:profileId/posts/add', Controller.createPost)
// router.get('/profiles/:profileId/posts/:postId/edit', Controller.editPostForm)
// router.post('/profiles/:profileId/posts/:postId/edit', Controller.updatePost)
// router.get('/profiles/:profileId/posts/:postId/tags/add', Controller.addTags)
// router.post('/profiles/:profileId/posts/:postId/tags/add', Controller.createTags)
// router.get('/profiles/:profileId/posts/:postId/delete', Controller.deletePost)