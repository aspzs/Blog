const router = require('express').Router();
const sequelize= require('../config/connection')
const { User, Post, Comment } = require('../models');

// GET all comments for homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username'],
        }
    ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({
            plain: true
        }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include: [{
            model: User,
            attributes: ['username'],
        }
    ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({
                message: 'No post with this id'
            });
            return;
        }
        const posts = dbPostData.get({
            plain: true
        });

        res.render('single-post', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('*', (req, res) => {
    res.status(404).send("No route");
});

module.exports = router;
