import {GithubUser} from "../entity/GithubUser";

export class Profile {
    constructor(githubUser, containerId) {
        const self = this;

        Object.defineProperty(self, 'user', {
            get: function () {
                if (!(githubUser instanceof GithubUser)) {
                    throw new Error('GithubUser is not instance of itself');
                }

                return githubUser;
            }
        });

        Object.defineProperty(self, 'container', {
            get: function () {
                const element = document.getElementById(containerId);

                if (null === element) {
                    throw new Error('containerId ' + containerId + ' was not found');
                }

                return element;
            }
        });
    }

    getMediaElement() {
        const self = this;
        const mediaElement = document.createElement('DIV');
        mediaElement.classList.add('media');

        function getMediaLeft() {
            const mediaLeft = document.createElement('DIV');
            const figure = document.createElement('FIGURE');
            const img = document.createElement('IMG');

            mediaLeft.classList.add('media-left');
            figure.classList.add('media-left');
            figure.classList.add('image');
            figure.classList.add('is-64x64');
            img.id = 'profile-image';
            img.src = self.user.avatar;
            figure.append(img);
            mediaLeft.append(figure);

            return mediaLeft;
        }

        function getMediaContent() {
            const mediaContent = document.createElement('DIV');
            const profileName = document.createElement('DIV');
            const subtitle = document.createElement('DIV');
            const anchorProfileUrl = document.createElement('A');
            appendContent();

            function prepareContent() {
                mediaContent.classList.add('media-left');
                profileName.classList.add('title');
                profileName.classList.add('is-5');
                profileName.id = 'profile-name';
                profileName.innerHTML = self.user.name;
                subtitle.classList.add('subtitle');
                subtitle.classList.add('is-6');
                anchorProfileUrl.href = self.user.url;
                anchorProfileUrl.id = 'profile-url';
                anchorProfileUrl.innerHTML = '@' + self.user.login;
            }

            function getBioDiv() {
                const bioDiv = document.createElement('DIV');
                const bioPara = document.createElement('P');
                let check = 'string' === typeof self.user.bio;

                bioPara.innerHTML = check ? self.user.bio : '(no information)';
                bioDiv.classList.add('content');
                bioDiv.classList.add('wrap');
                bioDiv.id = 'profile-bio';
                bioDiv.append(bioPara);

                return bioDiv;
            }

            function appendContent() {
                prepareContent();
                subtitle.append(anchorProfileUrl);
                mediaContent.append(profileName);
                mediaContent.append(subtitle);
                mediaContent.append(getBioDiv());
            }

            return mediaContent;
        }

        mediaElement.append(getMediaLeft());
        mediaElement.append(getMediaContent());

        return mediaElement;
    }

    appendHtml() {
        const self = this;
        const profile = document.createElement('DIV');
        const subtitle = document.createElement('H2');
        subtitle.innerHTML = 'Profile';
        subtitle.classList.add('subtitle');
        subtitle.classList.add('is-4');
        profile.classList.add('profile');
        profile.append(self.getMediaElement());
        self.container.innerHTML = '';
        self.container.append(subtitle);
        self.container.append(profile);
    }
}
