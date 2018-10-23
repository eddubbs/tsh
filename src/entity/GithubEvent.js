export class GithubEvent {
    constructor(responseBody) {
        const self = this;

        Object.defineProperty(self, "payload", {
            get: function () {
                checkIfObj(responseBody.payload);

                return responseBody.payload;
            }
        });

        Object.defineProperty(self, "repo", {
            get: function () {
                checkIfObj(responseBody.repo);

                return responseBody.repo;
            }
        });

        Object.defineProperty(self, "type", {
            get: function () {
                checkIfString(responseBody.type);

                return responseBody.type;
            }
        });

        Object.defineProperty(self, "created", {
            get: function () {
                checkIfString(responseBody.created_at);

                return responseBody.created_at;
            }
        });

        function checkIfObj(item) {
            if ('object' !== typeof item) {
                throw new Error(item + 'is not an object');
            }
        }

        function checkIfString(item) {
            if ('string' !== typeof item) {
                throw new Error(item + 'is not a string');
            }
        }

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
