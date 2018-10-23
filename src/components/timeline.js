export class timeline {
    constructor(identifier, response) {
        const self = this;

        Object.defineProperty(self, "whitelistedEvents", {
            get: function () {
                return {
                    PullRequestEvent: {
                        allowed: ['opened', 'closed'],
                        handler: handlePullRequestEvent,
                    },
                    PullRequestReviewCommentEvent: {
                        allowed: ['created', 'deleted', 'edited'],
                        handler: handlePullRequestReviewCommentEvent,
                    },
                };
            }
        });

        Object.defineProperty(self, "element", {
            get: function () {
                const element = document.getElementById(identifier);

                if ('object' === typeof element) {
                    return element;
                }

                throw new Error(identifier + 'not found');
            },
        });

        Object.defineProperty(self, "collection", {
            get: function () {
                if ('object' !== typeof response) {
                    throw new Error("invalid response: " + response);
                }

                return response;
            }
        });
    }

    prepareCollection() {
        let collection = [];

        function handleWhitelistedEvent(item) {
            if ('string' !== typeof item.type || 'object' !== typeof item.payload) {
                throw new Error('Provided values must be string');
            }

            Object.keys(self.whitelistedEvents).map(function (eventKey, eventProperties) {
                const typeCheck = eventKey === item.type;
                const payloadActionCheck = 'string' === typeof item.payload.action;

                if (typeCheck && payloadActionCheck && eventProperties.allowed.includes(item.payload.action)) {
                    collection.push({
                    })
                }
            });
        }
    }
}
