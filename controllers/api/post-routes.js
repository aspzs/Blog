const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_text', 'created_at', [sequelize.literal('(SELECT * FROM post)')]
    ],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes:
                    [
                        'username'
                    ]
                }
            },
            {
            model: User,
            attributes: ['username']
        }
    ]
   })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'post_text', 'created_at'],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes:
                [
                    'username'
                ]
            }
        },
        {
            model: User,
            attributes: ['username']
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
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a post
router.post('/', withAuth, (req, res) => {
    console.log('Creating...');
    Post.create({
        title: req.body.title,
        content: req.body.post_text,
        user_id: req.session.user_id
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
});

//Update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title
    }, {
        where: {
            id: req.params.id,
        },
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({
                message: 'No post with this id'
            });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });

});

//Delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbPostData) => {
        if(!dbPostData){
            res.status(404).json({
                message: 'No post with this id'
            });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;