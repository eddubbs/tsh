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

                return new EventCollectionFactory(responseBody);
            }
        });
    }

    renderHtmlCollection() {
        const self = this;
        const headline = document.createElement('H2');
        headline.classList.add('subtitle');
        headline.classList.add('is-4');
        headline.innerHTML = 'HISTORY';

        self.container.append(headline);
        self.container.append(self.collection.getFilledNode());
    }
}
