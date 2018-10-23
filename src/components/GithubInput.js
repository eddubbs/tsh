export class GithubInput {
    constructor(elementId) {
        const self = this;

        Object.defineProperty(self, 'container', {
            get: function () {
                const element = document.getElementById(elementId);

                if (null === element) {
                    throw new Error('Input with id ' + elementId + ' not found');
                }
            }
        });

        Object.defineProperty(self, 'inputState', {
            configurable: true,
            enumerable: true,
            writable: true,
        });

        self.handleState('initial');
    }

    handleState(stateName) {
        if ('string' !== stateName) {
            throw new Error('provided state is not valid');
        }

        const self = this;
        let check = false;

        Object.values(self.getStates()).map(function (item) {
            if (stateName === item.name) {
                check = true;
                self.inputState = stateName;
                item.action();
            }
        });

        if (false === check) {
            throw new Error('State is not within whitelisted ones');
        }
    }

    getStates() {
        const self = this;

        return [
            {name: 'initial', action: self.initialize},
            {name: 'deployed', action: self.addEventListeners},
            {name: 'invalid', action: self.invalidRequest},
            {name: 'valid', action: self.invalidRequest},
        ]
    }

    initialize() {
        const self = this;

        self.container.innerHTML = GithubInput.getRawHtml();
        self.handleState('deployed');
    }


    addEventListeners() {
        const self = this;
        const button = self.container.querySelector('.load-username');

        if (null === button) {
            throw new Error('.load-username class was not found')
        }

        //TODO: add event listeners and go to next state,
        // cover it with tests
    }

    invalidRequest() {

    }

    static getRawHtml() {
        return '<div class="field has-addons">' +
            '        <div class="control">' +
            '          <input class="input username" type="text" placeholder="enter github username">' +
            '        </div>' +
            '        <div class="control">\n' +
            '          <button class="button is-info load-username">' +
            '            Load' +
            '          </button>' +
            '        </div>' +
            '      </div>'
    };
}
