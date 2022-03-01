const server = require('../server');
const chai = require('chai')
const {expect} = chai;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

var host = "http://localhost:3000";
var pingPath = "/api/ping";
var postsPath = "/api/posts";

describe('Server tests', function () {
    it('should return body of {success:true}', done => {
        chai
            .request(server)
            .get(pingPath)
            .end((error, response) => {
                expect(response).to.have.status(200);
                expect(JSON.stringify(response.body)).to.equals('{"Success":true}')
                done();
            });
    });
    it("testing correctness of /api/posts", done => {
        chai
            .request(server)
            .get(postsPath)
            .query({tags:"health,tech"})
            .end((error,response) => {
                expect(response).to.have.status(200);
                var issue = false;
                let posts = response.body;
                for ( let i = 0; i < posts.length - 1; i++) {
                    if (posts[i].id >= posts[i+1].id) {
                        issue = true;
                    }
                    for (let j = 0; j < posts.length; j++) {
                        if (posts[i].id === posts[j].id && i !== j){
                            issue = true;
                        }
                    }
                }
                expect(issue).to.equals(false);
                done();
            })
    })
    it("testing correctness of /api/posts with more options", done => {
        chai
            .request(server)
            .get(postsPath)
            .query({tags:"health",direction:"desc",sortBy:"likes"})
            .end((error,response) => {
                expect(response).to.have.status(200);
                var issue = false;
                let posts = response.body;
                for (let i = 0; i < posts.length -1; i++) {
                    if (posts[i].likes < posts[i+1].likes) {
                        issue = true;
                    }
                    for (let j = 0; j < posts.length; j++) {
                        if (posts[i].id === posts[j].id && i !== j){
                            issue = true;
                        }
                    }
                }
                expect(issue).to.equals(false);
                done();
            })
    })
    after(function () {
        process.exit();
    })
});
