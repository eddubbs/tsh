import {GithubUser} from "../entity/GithubUser";
import {App} from "../app";

export class GithubInput {
    constructor(elementId, mainApp) {
        const self = this;

        Object.defineProperty(self, 'container', {
            get: function () {
                const element = document.getElementById(elementId);

                if (null === element) {
                    throw new Error('htmlNode with id ' + elementId + ' not found');
                }

                return element;
            }
        });

        Object.defineProperty(self, 'app', {
            get: function () {
                if (!(mainApp instanceof App)) {
                    throw new Error('mainApp is not instance of App');
                }

                return mainApp;
            }
        });

        Object.defineProperty(self, 'input', {
            get: function () {
                const input = self.container.querySelector('.username.input');

                if (null === input) {
                    throw new Error('input with class .username.input not found');
                }

                return input;
            }
        });

        Object.defineProperty(self, 'button', {
            get: function () {
                const button = self.container.querySelector('.load-username');

                if (null === button) {
                    throw new Error('button with class .load-username not found');
                }

                return button;
            }
        });

        self.initialize();
    }

    initialize() {
        const self = this;

        self.container.innerHTML = GithubInput.getRawHtml();
        self.addEventListeners();
    }

    addEventListeners() {
        const self = this;

        self.button.addEventListener('click', function () {
            let githubUser;
            self.cleanseErrorStates();

            try {
                githubUser = GithubUser.fromStringUserName(self.input.value);
            } catch (e) {
                if ('provided username is not valid' === e.message) {
                    return self.invalidUsername();
                }

                throw e;
            }

            self.app.fetchProfile(githubUser);
        });
    }

    invalidUsername() {
        const self = this;
        self.input.classList.add('input--error');
    }

    cleanseErrorStates() {
        const self = this;
        self.input.classList.remove('input--error');
    }

    static getRawHtml() {
        return '<div class="field has-addons">' +
            '        <div class="control">' +
            '          <input class="input username" type="text" placeholder="enter github username">' +
            '        </div>' +
            '        <div class="control">' +
            '          <button class="button is-info load-username">' +
            '            Load' +
            '          </button>' +
            '        </div>' +
            '      </div>'
    };
}
