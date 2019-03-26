const model = require("../model/model.js");

function getPosts(req, res){
    console.log("got to get post");
    model.getPosts(function(err, posts){
        if(err)
        {
           const data = {
            success: false,
            message: err
           };
            res.status(500).json(data);
        }else{
            const data = {
                success: true,
                    posts: posts
            };
            res.json(data);
        }
    });
}

function createPost(req, res){

    const userId = req.body.userId;
    const content = req.body.content;
    const date = new Date();

    model.createPost(userId, content, date, function(err, newPost){
        if(err)
        {
            const data = {
                success: false,
                message: err
            };
            res.status(500).json(data);
        }else{
            const data = {
                success: true,
                    post: newPost
            };
            res.json(data);
        }
    });
}

function createUser(req, res){

    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;

    model.createUser(username, password, displayName, function(err, user){
        if(err)
        {
            const data = {
                success: false,
                message: err
            };
            res.status(500).json(data);
        }else{
            const data = {
                success: true,
                user: user
            };
            res.json(data);
        }
    });
}

function login(req, res){

    const username = req.body.username;
    const pass = req.body.password;

    model.login(username, pass, function(err, user){
        if(err)
        {
            const data = {
                success: false,
                message: err
            };
            if(err == "incorrect")
                {
                    res.status(401).json(data);
                }
            else{
                res.status(500).json(data);
            }

        }else{
            req.session.username = username;
            const data = {
                success: true,
                user: user
            };
            res.json(data);
        }
    });
}

function logout(req, res){
    if (req.session.username) {
        req.session.destroy();
        // req.session.username = null;
        res.json({success: true});
    } else {
        res.json({success: false});
    }
}

module.exports = {
    getPosts: getPosts,
    createPost: createPost,
    login: login,
    logout: logout,
    createUser: createUser
};
