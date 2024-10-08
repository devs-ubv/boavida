const User = require("../models/User");
const New = require("../models/New");
const Video = require("../models/Video");

module.exports = {
   async indexPage(req, res) {
       try {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const {user_acount} = await User.countUser();
            const {video_acount} =  await Video.countVideo();
            const {new_acount} =  await New.countNew();
            const newPreview =  await New.findAllPreview();
            const userPreview =  await User.findAllPreview();
            res.render("admin/index", { session: req.session.user, previws: { newPreview,  userPreview }, user_acount, video_acount, new_acount });
        } else {
            res.redirect("/login")
        }
       } catch (error) {
        res.redirect("/login")
       }
    },
    new(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const { page, id } = req.params;
            
            res.render("admin/news", { session: req.session.user, params:{page, id} });
        } else {
            res.redirect("/login")
        }
    },
    
     newId(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const idNew = req.params.id;
            res.render("admin/new", { session: req.session.user, idNew});
        } else {
            res.redirect("/login")
        }
    },
    async findAll(req, res) {
        res.render("admin/index");
    },
    async findOne(req, res) {
        res.render("admin/index");
    },

    bannerPage(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const { page, id } = req.params;
            res.render("admin/banners", { session: req.session.user,  params:{page, id} });
        } else {
            res.redirect("/login")
        }
    },
    async bannerPageId(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const bannerId = req.params.id;
            res.render("admin/banner", { session: req.session.user, bannerId});
        } else {
            res.redirect("/login")
        }
    },

    videoPage(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const { page, id } = req.params;
            res.render("admin/videos", { session: req.session.user,  params:{page, id} });
        } else {
            res.redirect("/login")
        }
    },
     videoPageId(req, res) {
        if (req.session.autorizado && req.session?.user?.type === 'admin' || req.session?.user?.type === 'manager' || req.session?.user?.type === 'assistent') {
            const videoId = req.params.id;
            console.log(videoId);
            res.render("admin/video", { session: req.session.user, videoId});
        } else {
            res.redirect("/login")
        }
    },

}