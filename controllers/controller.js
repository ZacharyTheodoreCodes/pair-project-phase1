const { Profile,Post,Tag,User } = require("../models")
const { Op } = require("sequelize")
const formatPublished = require('../helpers/formatPublished')

class Controller{
    static kingsLanding(req, res){
        res.render('homepage', {"title": "iScape"})
    }

    static showAllProfile(req,res){
        const id = req.session.UserId
        const { firstName, lastName } = req.query
        let option = {include: User}
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
                if(data.dataValues.genderPronoun === "Mr"){
                    data.dataValues.icon = "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                }else{
                    data.dataValues.icon = "https://media.istockphoto.com/id/1331335536/vector/female-avatar-icon.jpg?s=170667a&w=0&k=20&c=-iyD_53ZEeZPc4SmvmGB1FJXZcHy_fvbJBv6O8HblHs="
                }

            });
             res.render('showAllProfiles', {profileData,id})
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static editProfileForm(req,res){
        const id = req.session.UserId
        Profile.findOne({
            include: User,
            where: {
                UserId: id
            }
        })
            .then((profile) => {
                res.render('editprofile', { profile })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    static updateProfile(req,res){
        const id = req.session.UserId
        //const { profileId } = req.params
        const { firstName, lastName, phone, gender } = req.body
        Profile.update({ firstName, lastName, phone, gender }, { where: {UserId: +id}})
        .then((result) => {
            res.redirect(`/profiles`);
        })
        .catch((err) => {
            console.log(err);
            res.send(err)
        })
    }
    
    static showProfilePost(req,res){
        const id = req.session.UserId
        const {profileId} = req.params;
        let option = {include: [{ model : Post , include: Tag}] }
        option.where = { id : +profileId}
        Profile.findOne(option)
        .then((profileData) => {
            profileData.dataValues.fullName = profileData.fullName
            profileData.dataValues.genderPronoun = Profile.genderPronoun(profileData.dataValues.gender)
            //res.send(profileData)
            res.render("showProfilePost",{profileData, formatPublished, id})
        })
        .catch((err) => {
            console.log(err);
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
        Post.create({ imgUrl,caption,ProfileId : +profileId })
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
        const { profileId, postId } = req.params;
        let foundPost;
        Post.findByPk(+postId)
        .then((post) => {
            foundPost = post;
            return foundPost.setTags([]).then(() => foundPost.destroy());
        })
        .then(() => {
            res.redirect(`/profiles/${+profileId}`);
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
    }

}

module.exports = Controller