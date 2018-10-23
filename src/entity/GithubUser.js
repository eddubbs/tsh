export class GithubUser {
    constructor(profileResponse) {
        const self = this;

        Object.defineProperty(self, "name", {
            get: function () {
                return profileResponse.name;
            }
        });

        Object.defineProperty(self, "login", {
            get: function () {
                return profileResponse.login;
            }
        });

        Object.defineProperty(self, "bio", {
            get: function () {
                return profileResponse.bio;
            }
        });

        Object.defineProperty(self, "url", {
            get: function () {
                return profileResponse.html_url;
            }
        });

        Object.defineProperty(self, "avatar", {
            get: function () {
                return profileResponse.avatar_url;
            }
        });

        function validateProfileResponse() {
            let keys = ['name', 'bio', 'avatar_url', 'html_url', 'login'];

            Object.values(keys).map(function (item) {
                if ('undefined' === typeof profileResponse[item]) {
                    throw new Error('Invalid profileResponse');
                }
            });
        }

        validateProfileResponse();
    }

    static fromGithubEventResponse(eventResponse) {
        if ('object' !== typeof eventResponse.actor) {
            throw new Error('Actor in eventResponse not found');
        }

        const actor = eventResponse.actor;
        validateEventResponse();

        function validateEventResponse() {
            let keys = ['display_login', 'url', 'avatar_url'];

            Object.values(keys).map(function (item) {
                if ('undefined' === typeof actor[item]) {
                    throw new Error('Invalid actor object in response from Github');
                }
            });
        }

        return new GithubUser({
            'name': false,
            'bio': false,
            'avatar_url': actor.avatar_url,
            'html_url': actor.url,
            'login': actor.display_login,
        });
    }
}
