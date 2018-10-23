import './assets/scss/app.scss';
import $ from 'cash-dom';
import {GithubUser} from "./entity/GithubUser";

export class App {
  initializeApp() {
      let self = this;
      const input = $('.username.input');
      const whitelistedEvents = {
          PullRequestEvent: {
              allowed: ['opened', 'closed'],
          },
          PullRequestReviewCommentEvent: {
              allowed: ['created', 'deleted', 'edited'],
          },
      };

      addEventListeners();

      Object.defineProperty(self, "username", {
          get: function () {
              const username = input.val();
              const regexp = new RegExp(/^[a-zA-Z0-9-_]+$/);

              if ('string' === typeof username && username.match(regexp)) {
                  input.removeClass('.input--error');

                  return username;
              }

              input.addClass('input--error');

              throw new Error('app.username is not valid');
          },
      });

      function handleWhitelistedEvent(item) {
          if ('string' !== typeof item.type || 'object' !== typeof item.payload) {
              throw new Error('Provided values must be string');
          }

          Object.keys(whitelistedEvents).map(function (eventKey, eventProperties) {
              const typeCheck = eventKey === item.type;
              const payloadActionCheck = 'string' === typeof item.payload.action;

              if (typeCheck && payloadActionCheck && eventProperties.allowed.includes(item.payload.action)) {
                  eventProperties.handler();
              }
          });
      }

      function addEventListeners() {
          $('.load-username').on('click', function () {
              fetch('https://api.github.com/users/' + self.username)
                  .then(response => { return handleResponse(response) })
                  .then(body => updateGithubProfile(body))
                  .then(() => fetchUserHistory());

              function fetchUserHistory() {
                  let endpoint = 'https://api.github.com/users/{username}/events/public';
                  endpoint = endpoint.replace('{username}', self.username);
                  fetch(endpoint)
                      .then(response => { return handleResponse(response) })
                      .then(body => updateGithubHistory(body))
              }

              function updateGithubProfile(body) {
                  self.profile = new GithubUser(body);
                  updateProfile();
              }

              function updateGithubHistory(body) {
                  let even = false;
                  const timeline = document.getElementById('user-timeline');

                  Object.values(body).map(function (item) {
                      const marker = document.createElement('DIV');
                      const content = document.createElement('DIV');

                      appendToContent();
                      handleWhitelistedEvent(item);

                      //TODO: move logic from appendToContent, build skeleton for each event rendering

                      function appendToContent() {
                          const heading = document.createElement('P');
                          const nestedContent = document.createElement('DIV');
                          const img = document.createElement('IMG');
                          const eventAnchor = document.createElement('A');
                          let eventName;

                          function eventTypeVoter() {
                              return 'undefined' !== item.actor
                                  && 'undefined' !== item.created_at
                                  && handleProperEventType();
                          }

                          function appendPreparedItemContent() {
                              const span = document.createElement('SPAN');
                              const usernameAnchor = document.createElement('A');
                              usernameAnchor.href = item.actor.url;
                              usernameAnchor.innerText = item.actor.login;
                              span.classList.add("gh-username");
                              span.append(img, usernameAnchor);
                              nestedContent.append(span);
                              nestedContent.innerText += 'closed';
                              eventAnchor.innerText = item.type;
                              nestedContent.appendChild(eventAnchor);
                          }

                          content.appendChild(heading);
                          content.appendChild(nestedContent);
                      }

                      function handleProperEventType()
                      {
                          let check = false;

                          if ('string' !== typeof item.type || 'object' !== typeof item.payload) {
                              throw new Error('Provided values must be string');
                          }

                          Object.keys(whitelistedEvents).map(function (key, index, value) {
                              const typeCheck = key === item.type;
                              const payloadActionCheck = 'string' === typeof item.payload.action;

                              if (typeCheck && payloadActionCheck && value.includes(item.payload.action)) {
                                  check = true;
                              }
                          });

                          return check;
                      }

                      function appendToTimeline() {
                          marker.classList.add('timeline-marker');
                          content.classList.add('timeline-content');

                          timeline.appendChild(marker);
                          timeline.appendChild(content);
                      }
                  })
              }

              function handleResponse(response) {
                  if (200 === response.status) {
                      return response.json()
                  }

                  if (404 === response.status) {
                      input.addClass('input--error');
                  }

                  throw new Error('Could not fetch username. Error: ' + response.status);
              }
          });
      }

      function updateProfile() {
          $('#profile-name').text(self.profile.name);
          $('#profile-image').attr('src', self.profile.avatar);
          $('#profile-url').attr('href', self.profile.url).text(self.profile.login);
          $('#profile-bio').text(self.profile.bio || '(no information)')
      }
  }
}
