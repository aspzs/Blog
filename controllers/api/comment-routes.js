const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


//Get all comments 
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id'
        ],
        include: [
            {
                model: User,
                as: "user",
                attributes: ['username'],
            },
        ],
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a comment by an did
router.post('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id,
        },
        attributes: [
            'id',
            'comment_text',
            'user_id',
            'post_id'
        ],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['username'],
            },
        ],
    })
    .then((dbCommentData) => {
        if (!dbCommentData){
            res.status(404).json({message:'No comment with thid id'});
            return;
        }
        res.json(dbCommentData);
    })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POst comment based in id
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        post_id: req.body.post_id,
    })
    .then((dbCommentData) => {
        res.json(dbCommentData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});




module.exports = router;