import './assets/scss/app.scss';
import $ from 'cash-dom';
import {GithubUser} from "./entity/GithubUser";
import {Profile} from "./components/Profile";
import {Timeline} from "./components/Timeline";
import {EventCollectionFactory} from "./factory/EventCollectionFactory";

export class App {
    constructor() {
        const self = this;

        Object.defineProperty(self, 'githubUser', {
            enumerable: true,
            writable: true,
        });
    }

    initializeApp() {
        let self = this;

        function addEventListeners() {
            $('.load-username').on('click', function () {
                fetch('https://api.github.com/users/' + self.username)
                    .then(response => { return handleResponse(response) })
                    .then(body => {self.updateGithubProfile(body)})
                    .then(() => fetchUserHistory());

                function fetchUserHistory() {
                    let endpoint = 'https://api.github.com/users/{username}/events/public';
                    endpoint = endpoint.replace('{username}', self.username);
                    fetch(endpoint)
                        .then(response => {
                            return handleResponse(response) })
                        .then(body => self.updateGithubTimeline(body))
                }

                function handleResponse(response) {
                    if (200 === response.status) {
                        return response.json()
                    }

                    if (404 === response.status) {
                        input.addClass('input--error');
                    }

                    throw new Error('Could not fetch username. Error: ' + response.status);
                }
            });
        }
    }

    updateGithubProfile(body) {
        const self = this;
        self.githubUser = new GithubUser(body);
        const profile = new Profile(self.githubUser, 'githubProfile');
        profile.appendHtml();
    }

    updateGithubTimeline(body) {
        const eventCollection = new EventCollectionFactory(body).getAllowedEventsOnly();
        const timeline = new Timeline(eventCollection);
        timeline.appendHtml();
    }
}
