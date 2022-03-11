const { Config } = require("node-json-db/dist/lib/JsonDBConfig");
const { JsonDB } = require("node-json-db");
const { TwitterApi } = require("twitter-api-v2");
const bearerToken = require("../../twitterApiKeys.json").BearerToken;
const twitterClient = new TwitterApi(bearerToken);
const defaultHashtag = "bbb";
let app = require("../../server.js");

const db = new JsonDB(new Config("database", true, false, "/"));

const getPendingTweets = async() => {
    if (!db.exists("/tweetsPending") || db.count("/tweetsPending") == 0) {
        await fetchFromTwitter();
    }
    return db.getData("/tweetsPending");
};

const fetchFromTwitter = async() => {
    let hashtag = db.exists("/hashtag") ? db.getData("/hashtag") : defaultHashtag;

    try {
        const response = await twitterClient.v2.search(
            `#${hashtag} -is:reply -is:retweet`, {
                max_results: 10,
                "user.fields": ["name,username,profile_image_url"],
                expansions: ["author_id"],
            }, {
                requestEventDebugHandler: (eventType, data) =>
                    console.log("Event", eventType, "with data", data),
            }
        );
        var responseData = response._realData;

        const users = responseData.includes.users;
        const tweets = responseData.data.map(function(x) {
            return {...x, user: users.find((u) => u.id == x.author_id) };
        });
        db.push("/tweetsPending", tweets);
    } catch (Error) {
        console.log(Error);
    }
};

exports.setHashtag = async(req, res, next) => {
    const hashtag = req.body.hashtag;

    if (hashtag && hashtag != "") {
        const currentHashtag = db.exists("/hashtag") ? db.getData("/hashtag") : "";
        if (currentHashtag != hashtag) {
            db.push("/hashtag", hashtag);
            await fetchFromTwitter();
            db.push("/tweetsApproved", []);
            app.io().emit("UpdateTweets", {
                tweetsApproved: db.getData("/tweetsApproved"),
                tweetsPending: db.getData("/tweetsPending"),
            });
        }
        app.io().emit("UpdateHashtag", hashtag);
        res.status(200).send("sucesso");
    } else {
        res.status(500).send("fail");
    }
};

exports.getHashtag = async(req, res, next) => {
    const hashtag = db.exists("/hashtag") ?
        db.getData("/hashtag") :
        defaultHashtag;
    res.status(200).send({ hashtag });
};

exports.pushApproved = async(req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) throw "Invalid Params";

        db.push("/tweetsApproved", [req.body], false);

        const tweetsPending = await getPendingTweets();
        db.push(
            "/tweetsPending",
            tweetsPending.filter((x) => x.id != req.body.id),
            true
        );
        app.io().emit("UpdateTweets", {
            tweetsApproved: db.getData("/tweetsApproved"),
            tweetsPending: db.getData("/tweetsPending"),
        });

        res.status(200).send("sucesso");
    } catch (error) {
        console.log(error);
        res.status(500).send("fail");
    }
};

exports.deleteTweet = async(req, res, next) => {
    try {
        const path = "/" + req.body.dbPath;
        const tweets = db.getData(path);

        db.push(
            path,
            tweets.filter((x) => x.id != req.body.tweet.id),
            true
        );

        const action =
            path == "/tweetsApproved" ? "UpdateApproved" : "UpdatePending";

        const data =
            path == "/tweetsPending" ? await getPendingTweets() : db.getData(path);

        app.io().emit(action, data);

        res.status(200).send("sucesso");
    } catch (error) {
        res.status(500).send("fail");
    }
};

exports.pushToTop = async(req, res, next) => {
    try {
        const tweets = db.getData("/tweetsApproved");
        const tweet = req.body;
        db.push(
            "/tweetsApproved", [tweet].concat(tweets.filter((x) => x.id != tweet.id)),
            true
        );

        app.io().emit("UpdateApproved", db.getData("/tweetsApproved"));

        res.status(200).send("sucesso");
    } catch (error) {
        res.status(500).send("fail");
    }
};

exports.getTweets = async(req, res, next) => {
    try {
        const path = "/" + req.params.path;
        const data =
            path == "/tweetsPending" ? await getPendingTweets() : db.getData(path);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("fail");
    }
};

exports.getAll = async(req, res, next) => {
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send(db.getData("/"));
    } catch (error) {
        res.status(500).send("fail");
    }
};

exports.socketTest = async(req, res, next) => {
    app.io().emit("FromAPI", "deu boa");
    res.status(200).send("roi");
};

exports.getById = async(req, res, next) => {
    const response = await twitterClient.v2.search(
        `#${req.params.id} -is:reply -is:retweet`, {
            max_results: 10,
            "user.fields": ["name,username,profile_image_url"],
            expansions: ["author_id"],
        }
    );

    var responseData = response._realData;

    const users = responseData.includes.users;
    const tweets = responseData.data.map(function(x) {
        return {...x, user: users.find((u) => u.id == x.author_id) };
    });

    db.push("/tweetsPending", tweets);
    res.status(200).send(db.getData("/tweetsPending"));
};