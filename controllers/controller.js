const { Profile,Post,Tag,User } = require("../models")
const { Op } = require("sequelize")
const formatPublished = require('../helpers/formatPublished')

class Controller{
    static showAllProfile(req,res){
        const { firstName, lastName } = req.query
        let option = {}
        if (firstName || lastName){
            option.where = {
                firstName: {
                    [Op.iLike]: `%${firstName}%`,
                },
                lastName: {
                    [Op.iLike]: `%${lastName}%`,
                },
            }
        }
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

    static editProfileForm(req,res){
        res.render("editProfileForm")
    }

    static updateProfile(req,res){
        const { profileId } = req.params
        const { firstName, lastName, phone, gender } = req.body
        Profile.update({ firstName, lastName, phone, gender }, { where: {id: +profileId}})
        .then((result) => {
            res.redirect(`/profiles`);
        })
        .catch((err) => {
            console.log(err);
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
            //res.send(profileData)
            res.render("showProfilePost",{profileData, formatPublished})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static addPostForm(req,res){
        const { errors } = req.query;
        const { profileId } = req.params;
        let option = {
            where: {id: +profileId}
        }
        Profile.findOne(option)
        .then((result) => {
            res.render("addPost",{result, errors})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }

    static createPost(req,res){
        const { profileId } = req.params;
        const { imgUrl,caption } = req.body;
        Profile.create({ imgUrl,caption,ProfileId : +profileId })
        .then((result) => {
            res.redirect(`/profiles/${profileId}`)
        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((el) => {
                    return el.message
                })
                res.redirect(`/profiles/${profileId}/posts/add?errors=${err.join(';')}`)
            }else{
                //console.log(err);
                res.send(err)
            }
        })
    }

    static addTagsForm(req,res){
        const { errors } = req.query;
        const { postId } = req.params;
        let option = {
            where: {id: +postId}
        }
        Post.findOne(option)
        .then((result) => {
            res.render("addTag",{result , errors})
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }

    static createTags(req,res){
        const { profileId, postId } = req.params;
        const { name } = req.body;
        let foundPost;
        Post.findByPk(+postId)
        .then((post) => {
            foundPost = post;
            return Tag.create({ name });
        })
        .then((tag) => {
            return foundPost.addTag(tag);
        })
        .then(() => {
            res.redirect(`/profiles/${+profileId}`);
        })
        .catch((err) => {
            if (err.name === "SequelizeValidationError") {
                err = err.errors.map((el) => {
                    return el.message
                })
                ///profiles/:profileId/posts/:postId/tags/add
                res.redirect(`/profiles/${profileId}/posts/${postId}/tags/add?errors=${err.join(';')}`)
            }else{
                //console.log(err);
                res.send(err)
            }
        });
    }

    static deletePost(req,res){
        const { profileId,postId } = req.params;
        Post.destroy({ where: { id: +postId } })
        .then ((result) => {
            res.redirect(`/profiles/${+profileId}`)
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
    }

}

module.exports = Controller