import {GithubEvent} from "../entity/GithubEvent";

export class EventCollectionFactory {
    constructor(responseBody) {
        const self = this;

        Object.defineProperty(self, 'allowedKeys', {
            get: function () {
                return [
                    {
                        name: 'PullRequestEvent',
                        allowed: ['opened', 'closed'],
                        simpleName: 'pull_request',
                    },
                    {
                        name: 'PullRequestReviewCommentEvent',
                        allowed: ['created', 'deleted', 'edited'],
                        simpleName: 'comment',
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

    static getPayloadActionName(githubEvent) {
        const self = new EventCollectionFactory({});
        let simpleName;

        if (!(githubEvent instanceof GithubEvent)) {
            throw new Error('githubEvent is not instance of GithubEvent class');
        }

        Object.values(self.allowedKeys).map(function (item) {
            if (item.name === githubEvent.eventType) {
                simpleName = item.simpleName;
            }
        });

        if ('string' === typeof simpleName) {
            return simpleName;
        }

        throw new Error(githubEvent.eventType + ' not found in allowedKeys')
    }

    getFilledNode() {
        const self = this;
        const filledNode = document.createElement('DIV');
        let isEven = true;

        Object.values(self.getAllowedEventsOnly()).map(function (item) {
            isEven = !isEven;
            filledNode.append(item.getFilledNode(isEven));
        });

        return filledNode;
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
