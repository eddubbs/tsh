export class Profile {
    constructor(GithubUser, containerId) {
        const self = this;

        Object.defineProperty(self, "user", {
            get: function () {
                if (!GithubUser instanceof GithubUser) {
                    throw new Error('GithubUser is not instance of itself');
                }

                return GithubUser;
            }
        });

        Object.defineProperty(self, "container", {
            get: function () {
                const element = document.getElementById(containerId);

                if ('object' !== typeof element) {
                    throw new Error('containerId ' + containerId + ' was not found');
                }

                return element;
            }
        });
    }

    getMediaElement() {
        const mediaElement = document.createElement('DIV');
        mediaElement.classList.add('media');

        function getMediaLeft() {
            const mediaLeft = document.createElement('DIV');
            const figure = document.createElement('FIGURE');
            const img = document.createElement('IMG');

            mediaLeft.classList.add('media-left');
            figure.classList.add('media-left', 'image', 'is-64x64');
            img.id = 'profile-image';
            img.src = self.user.avatar;
            figure.appendChild(img);
            mediaLeft.appendChild(figure);

            return mediaLeft;
        }

        function getMediaContent() {
            const mediaContent = document.createElement('DIV');
            const profileName = document.createElement('DIV');
            const subtitle = document.createElement('DIV');
            const anchorProfileUrl = document.createElement('A');

            mediaContent.classList.add('media-left');
            profileName.classList.add('title', 'is-5');
            profileName.id = 'profile-name';
            profileName.innerText = self.user.name;
            subtitle.classList.add('subtitle', 'is-6');
            anchorProfileUrl.href = self.user.url;
            anchorProfileUrl.id = 'profile-url';
            anchorProfileUrl.innerText = '@' + self.user.login;

            subtitle.appendChild(anchorProfileUrl);
            mediaContent.appendChild(profileName);
            mediaContent.appendChild(subtitle);

            return mediaContent;
        }

        mediaElement.appendChild(getMediaLeft());
        mediaElement.appendChild(getMediaContent());


        return mediaElement;
    }

    static append() {
        self.container.appendChild(self.getMediaElement());
    }
}
