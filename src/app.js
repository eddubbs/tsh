import './assets/scss/app.scss';
import $ from 'cash-dom';

export class App {
  initializeApp() {
      let self = this;
      const input = $('.username.input');

      setDefaults();
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

      function setDefaults() {
          self.profile = {
              bio: '',
              avatar_url: '',
              html_url: '',
              login: '',
          };
      }

      function addEventListeners() {
          $('.load-username').on('click', function () {
              fetch('https://api.github.com/users/' + self.username)
                  .then(response => {
                      if (200 === response.status) {
                          return response.json()
                      }

                      if (404 === response.status) {
                          input.addClass('input--error');
                      }

                      throw new Error('Could not fetch username. Error: ' + response.status);
                  })
                  .then(resp => updateGithubProfile(resp));

              function updateGithubProfile(body) {
                  self.profile = body;
                  updateProfile();
              }
          });
      }

      function updateProfile() {
          $('#profile-name').text(self.username);
          $('#profile-image').attr('src', self.profile.avatar_url);
          $('#profile-url').attr('href', self.profile.html_url).text(self.profile.login);
          $('#profile-bio').text(self.profile.bio || '(no information)')
      }
  }
}
