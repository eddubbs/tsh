import {GithubUser} from "../entity/GithubUser";
import {GithubInput} from "../components/GithubInput";

// Due to there are no credentials over calls by now, there is no need of constructor/credentials builder;

export class GithubClient {
    static fetchUserProfile(githubUser, observerCallback) {
        // observerCallback must have updateGithubProfile(body) method;
        if (!(githubUser instanceof GithubUser)) {
            throw new Error('githubUser is not instance of itself');
        }

        fetch('https://api.github.com/users/' + githubUser.name)
            .then(response => { return GithubClient.handleResponse(response) })
            .then(body => {observerCallback.updateGithubProfile(body)})
            .catch(e => {observerCallback.handleInvalidFetchState(e)})
    }

    static fetchUserTimeline(githubUser, observerCallback) {
        // observerCallback must have updateGithubProfile(body) method;
        if (!(githubUser instanceof GithubUser)) {
            throw new Error('githubUser is not instance of itself');
        }

        let endpoint = 'https://api.github.com/users/{username}/events/public';
        endpoint = endpoint.replace('{username}', githubUser.login);

        fetch(endpoint)
            .then(response => {
                return GithubClient.handleResponse(response) })
            .then(body => observerCallback.updateGithubTimeline(body))
    }

    static handleResponse(response) {
        if (200 === response.status) {
            return response.json()
        }

        if (404 === response.status) {
            throw new Error('Could not fetch username');
        }

        throw new Error('Could not fetch. Response status: ' + response.status);
    }
}
