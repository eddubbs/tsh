export class GithubEvent {
    constructor(responseBody) {
        const self = this;

        Object.defineProperty(self, "payload", {
            get: function () {
                return responseBody.payload;
            }
        });

        Object.defineProperty(self, "repo", {
            get: function () {
                return responseBody.repo;
            }
        });

        Object.defineProperty(self, "eventType", {
            get: function () {
                return responseBody.type;
            }
        });

        Object.defineProperty(self, "created", {
            get: function () {
                return responseBody.created_at;
            }
        });

        function validateProfileResponse() {
            let allowedObjectTypes = [
                {name: 'payload',       type: 'object'},
                {name: 'repo',          type: 'object'},
                {name: 'type',          type: 'string'},
                {name: 'created_at',    type: 'string'},
            ];

            Object.values(allowedObjectTypes).map(function (item) {
                const name = item.name;
                const type = item.type;

                if (type !== typeof responseBody[name]) {
                    throw new Error('Invalid responseBody');
                }
            });
        }

        validateProfileResponse();
    }
}
