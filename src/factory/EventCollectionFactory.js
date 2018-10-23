import {GithubEvent} from "../entity/GithubEvent";

export class EventCollectionFactory {
    constructor(responseBody) {
        const self = this;

        Object.defineProperty(self, 'allowedKeys', {
            get: function () {
                return [
                    {
                        name: 'PullRequestEvent',
                        allowed: ['opened', 'closed']
                    },
                    {
                        name: 'PullRequestReviewCommentEvent',
                        allowed: ['created', 'deleted', 'edited']
                    },
                ]
            }
        });

        Object.defineProperty(self, 'collection', {
            get: function () {
                if ('object' !== typeof responseBody) {
                    throw new Error('Invalid responseBody');
                }

                return responseBody;
            }
        });
    }

    getAllowedEventsOnly() {
        const self = this;
        let cacheArr = [];

        Object.values(self.collection).map(function (item) {
            const event = new GithubEvent(item);

            Object.values(self.allowedKeys).map(function (allowedKey) {
                if (allowedKey.name !== event.eventType) {
                    return;
                }

                if ('undefined' === typeof event.payload.action) {
                    return;
                }

                if (allowedKey.allowed.includes(event.payload.action)) {
                    cacheArr.push(event);
                }
            });
        });

        return cacheArr;
    }
}
