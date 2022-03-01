const router = require('express').Router();
const axios = require('axios');

const sorting = require('../../helpers/sort');

const sortByChoices = ['id','reads','likes','popularity'];
const directionChoices = ['desc','asc'];

router.get('/', (req,res) => {

    //check for correct parameters
    if (!req.query.tags || req.query.tags === "") {
        res.status(400).send({"error": "Tags parameter is required"})
        return;
    }
    if (req.query.sortBy) {
        if (sortByChoices.indexOf(req.query.sortBy) === -1) {
            res.status(400).send({"error": "sortBy parameter is invalid"})
            return;
        }
    }
    if (req.query.direction) {
        if(directionChoices.indexOf(req.query.direction) === -1) {
            res.status(400).send({"error": "direction parameter is invalid"})
            return;
        }
    }
    let posts = [];
    const tags = req.query.tags.split(",");
    const promises = []
    // iterate through tags, getting a promise for each one
    for ( let i = 0; i < tags.length; i++) {
        tags[i] = tags[i].trim();
        let url = new URL("https://api.hatchways.io/assessment/blog/posts");
        url.searchParams.append("tag", tags[i]);
        const response = axios.get(url.toString());
        promises.push(response);

    }
    //once all promises are complete then
    const data  = Promise.all(promises).then ((values) => {
        for (let i = 0; i < values.length; i++) {
            posts.push(...values[i].data.posts)
        }
        //remove duplicates
        let postsAsSet = {}
        for ( let i = 0; i < posts.length; i++) {
            postsAsSet[posts[i].id] = posts[i];
        }
        posts = Object.values(postsAsSet);
        res.status(200).send(posts);
    });


});

module.exports = router;