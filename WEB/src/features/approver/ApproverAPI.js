export async function fetchTweets(hashtag = "bbb") {
    const response = await fetch(`http://localhost:3333/usuario/${hashtag}`);
    var data = await response.json();
    return data;
}

export async function pushApprovedAsync(tweet) {
    const response = await fetch(`http://localhost:3333/pushApproved`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweet),
    });
    var data = await response.json();
    return data;
}

export async function getTweets(path) {
    const response = await fetch(`http://localhost:3333/getTweets/${path}`);
    var data = await response.json();
    return data;
}

export async function deleteTweetAsync(tweet, dbPath) {
    const response = await fetch(`http://localhost:3333/deleteTweet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tweet, dbPath }),
    });
    var data = await response.json();
    return data;
}

export async function pushToTopAsync(tweet) {
    const response = await fetch(`http://localhost:3333/pushToTop`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweet),
    });
    var data = await response.json();
    return data;
}

export async function setHashtagAsync(hashtag) {
    const response = await fetch(`http://localhost:3333/setHashtag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hashtag }),
    });
    var data = await response.json();
    return data;
}
export async function getHashtagAsync() {
    const response = await fetch(`http://localhost:3333/getHashtag`);
    var data = await response.json();
    return data.hashtag;
}