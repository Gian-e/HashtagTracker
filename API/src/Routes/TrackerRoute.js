const TrackerController = require('../Controllers/TrackerController');
module.exports = (app) => {
    app.get('/usuario/:id', TrackerController.getById);
    app.post('/pushApproved/', TrackerController.pushApproved);
    app.post('/deleteTweet/', TrackerController.deleteTweet);
    app.get('/getTweets/:path', TrackerController.getTweets);
    app.get('/getAll/', TrackerController.getAll);
    app.post('/pushToTop/', TrackerController.pushToTop);
    app.get('/getHashtag/', TrackerController.getHashtag);
    app.post('/setHashtag/', TrackerController.setHashtag);
    app.get('/socket', TrackerController.socketTest);
}