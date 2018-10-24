import './assets/scss/app.scss';
import {GithubUser} from "./entity/GithubUser";
import {Profile} from "./components/Profile";
import {Timeline} from "./components/Timeline";
import {GithubClient} from "./client/GithubClient";
import {GithubInput} from "./components/GithubInput";

export class App {
    constructor() {
        const self = this;

        Object.defineProperty(self, 'githubUser', {
            enumerable: true,
            writable: true,
        });

        self.initializeApp();
    }

    initializeApp() {
        let self = this;
        const githubInput = new GithubInput('github-user-fetch', self);
        githubInput.initialize();
    }

    fetchProfile(githubUser) {
        const self = this;
        GithubInput.runSpinner();
        GithubClient.fetchUserProfile(githubUser, self);
    }

    fetchTimeline(githubUser) {
        const self = this;
        GithubClient.fetchUserTimeline(githubUser, self);
    }

    updateGithubProfile(body) {
        const self = this;
        self.githubUser = new GithubUser(body);
        const profile = new Profile(self.githubUser, 'githubProfile');
        profile.appendHtml();
        self.fetchTimeline(self.githubUser, self);
    }

    updateGithubTimeline(body) {
        const timeline = new Timeline('user-timeline', body);
        timeline.appendHtml();
        GithubInput.hideSpinner();
    }

    handleInvalidFetchState(e) {
        if (!(e instanceof Error)) {
            throw new Error('invalid argument for function');
        }

        const rawProfile = document.getElementById('githubProfile');
        const rawTimeline = document.getElementById('user-timeline');

        rawProfile.innerHTML = '<h2 class="subtitle is-4">Profile</h2><span>user not found</span>';
        rawTimeline.innerHTML = '<h2 class="subtitle is-4">History</h2>' +
            '<img src="https://s3.eu-central-1.amazonaws.com/blazej.m8b.pl/tsh/images/2kvyb4.jpg">';
        GithubInput.hideSpinner();
    }
}
