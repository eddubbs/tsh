import {EventCollectionFactory} from "../factory/EventCollectionFactory";

export class Timeline {
    constructor(containerId, responseBody) {
        const self = this;

        Object.defineProperty(self, 'container', {
            get: function () {
                const element = document.getElementById(containerId);

                if (null === element) {
                    throw new Error(containerId + 'not found');
                }

                return element;
            },
        });

        Object.defineProperty(self, 'collection', {
            get: function () {
                if ('object' !== typeof responseBody) {
                    throw new Error('Invalid responseBody');
                }

                return new EventCollectionFactory(responseBody).getAllowedEventsOnly();
            }
        });
    }

    renderHtml() {
        const self = this;
        let even = false;

        Object.values(self.collection).map(function (item) {
            even = !even;
        })

    }
}
