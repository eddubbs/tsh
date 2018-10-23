import {GithubUser} from "./GithubUser";
import {EventCollectionFactory} from "../factory/EventCollectionFactory";

export class GithubEvent {
    constructor(responseBody) {
        const self = this;

        Object.defineProperty(self, 'responseBody', {
            get: function () {
                return responseBody;
            }
        });

        Object.defineProperty(self, 'payload', {
            get: function () {
                return responseBody.payload;
            }
        });

        Object.defineProperty(self, 'repo', {
            get: function () {
                return responseBody.repo;
            }
        });

        Object.defineProperty(self, 'eventType', {
            get: function () {
                return responseBody.type;
            }
        });

        Object.defineProperty(self, 'created', {
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

    getFilledNode(even) {
        const self = this;
        const user = GithubUser.fromGithubEventResponse(self.responseBody);
        const mainNode = document.createElement('DIV');
        const marker = document.createElement('DIV');
        const timelineContent = document.createElement('DIV');
        const heading = document.createElement('P');
        const nestedContent = prepareNestedContent();
        addClasses();
        combineNodes();

        function combineNodes() {
            timelineContent.appendChild(heading);
            timelineContent.appendChild(nestedContent);
            mainNode.appendChild(marker);
            mainNode.appendChild(timelineContent);
        }

        function addClasses() {
            mainNode.classList.add('timeline-item');
            marker.classList.add('timeline-marker');
            timelineContent.classList.add('timeline-content');
            nestedContent.classList.add('content');
            heading.classList.add('heading');
            heading.innerHTML = new Date(self.created).toDateString();

            if ('undefined' !== even && true === even) {
                mainNode.classList.add('is-primary');
                marker.classList.add('is-primary');
            }
        }

        function prepareNestedContent() {
            function prepareNestedSpanContent() {
                const nestedSpan = document.createElement('SPAN');
                const img = document.createElement('IMG');
                const anchor = document.createElement('A');
                anchor.href = user.url;
                anchor.innerHTML = user.login;
                img.src = user.avatar;
                nestedSpan.classList.add('gh-username');

                nestedSpan.appendChild(img);
                nestedSpan.appendChild(anchor);

                return nestedSpan;
            }

            function prepareActionSpan() {
                const actionSpan = document.createElement('SPAN');
                actionSpan.innerHTML = self.payload.action;
                actionSpan.classList.add('timeline__action--js');

                return actionSpan;
            }

            function prepareEventAnchor() {
                const eventAnchor = document.createElement('A');
                const contextCase = EventCollectionFactory.getPayloadActionName(self);
                eventAnchor.href = self.payload[contextCase].url;
                eventAnchor.innerHTML = contextCase.replace('_', ' ');

                return eventAnchor;
            }

            function prepareRepoParagraph() {
                const paragraph = document.createElement('P');
                const repoAnchor = document.createElement('A');
                paragraph.classList.add('repo-name');
                repoAnchor.href = self.repo.url;
                repoAnchor.innerHTML = self.repo.name;
                paragraph.appendChild(repoAnchor);

                return paragraph;
            }

            function getNestedContent() {
                const nestedContent = document.createElement('DIV');
                const nestedSpanContent = prepareNestedSpanContent();
                const actionSpan = prepareActionSpan();
                const eventAnchor = prepareEventAnchor();
                const paragraphWithRepo = prepareRepoParagraph();

                nestedContent.append(nestedSpanContent);
                nestedContent.append(actionSpan);
                nestedContent.append(eventAnchor);
                nestedContent.append(paragraphWithRepo);

                return nestedContent;
            }

            return getNestedContent();
        }

        return mainNode;
    }
}
