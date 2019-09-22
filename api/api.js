const baseUrl = 'https://www.reddit.com/';
const jsonPostfix = '.json';

async function sendRequest(url, requestParams) {
    let response = await fetch(url, requestParams);
    let result;

    try {
        result = await response.json();
    } catch (e) {
        result = { error: e };
    }
    return result;
}

class RedditAPI {
    static async getFeed(subreddit = '') {
        return sendRequest(`${baseUrl}${subreddit}${jsonPostfix}`);
    }

    static async fetchNextFeed(subreddit = '', lastPostName) {
        return sendRequest(`${baseUrl}${subreddit}${jsonPostfix}?count=25&after=${lastPostName}`);
    }
}

export default RedditAPI;
