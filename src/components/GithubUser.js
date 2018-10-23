export class GithubUser {
    constructor(profileResponse) {
        const self = this;

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
            let keys = ['bio', 'avatar_url', 'html_url', 'login'];

            Object.values(keys).map(function (item) {
                if ('undefined' === typeof profileResponse[item]) {
                    throw new Error('Invalid profileResponse');
                }
            });
        }

        validateProfileResponse();
    }
}
