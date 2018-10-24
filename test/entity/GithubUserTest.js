'use strict';

import {GithubUser} from '../../src/entity/GithubUser';
const expect = require('chai').expect;

describe('GithubUserTest', function () {
   it('test valid creation of obj', function () {
       const validResponse = {
           name: 'baboon',
           bio: 'I\'r baboon',
           avatar_url: 'https://fakeadress.com/avatar.png',
           html_url: 'https://fakeadress.com/index.html',
           login: 'baboonX'
       };
       const validGithubUser = new GithubUser(validResponse);

       expect(validGithubUser).to.be.instanceOf(GithubUser);
   });

   it('test invalid creation of obj', function () {
       let thrown;

       try {
           new GithubUser('some invalid string');
       } catch (e) {
           expect(e.message).to.be.equal('Invalid profileResponse');
           thrown = true;
       }

       expect(thrown).to.be.true;
   });

   it('test static constructor fromGithubEventResponse', function () {
       const validGithubUser = GithubUser.fromGithubEventResponse(validPullRequestEvent);
       expect(validGithubUser).to.be.instanceOf(GithubUser);
   });

   it('test invalid static constructor fromGithubEventResponse', function () {
       let thrown;

       try {
           thrown = GithubUser.fromGithubEventResponse({'actor': { 'name' : 'Brad Pitt'}});
       } catch (e) {
           expect(e.message).to.be.equal('Invalid actor object in response from Github');
           thrown = true;
       }

       expect(thrown).to.be.true;
   });

   it('test valid fromString static constructor', function () {
       const validUserName = 'baboonX_0-1B';
       const validUser = GithubUser.fromStringUserName(validUserName);

       expect(validUser).to.be.instanceOf(GithubUser);
   });

   it('test invalid fromString static constructor', function () {
       const withSpace = 'space4 Comrade';
       const withSpecialChar = 'space4$';
       const objectInsteadOfString = {};
       let thrown;
       let thrown1;
       let thrown2;

       try {
           thrown = GithubUser.fromStringUserName(withSpace);
       } catch (e) {
           expect(e.message).to.be.equal('provided username is not valid');
           thrown = true;
       }

       try {
           thrown1 = GithubUser.fromStringUserName(withSpecialChar);
       } catch(e) {
           expect(e.message).to.be.equal('provided username is not valid');
           thrown1 = true;
       }

       try {
           thrown2 = GithubUser.fromStringUserName(objectInsteadOfString);
       } catch(e) {
           expect(e.message).to.be.equal('provided username is not a string');
           thrown2 = true;
       }

       expect(thrown).to.be.true;
       expect(thrown1).to.be.true;
       expect(thrown2).to.be.true;
   });
});

const validPullRequestEvent = {
    "id": "8448335229",
    "type": "PullRequestEvent",
    "actor": {
        "id": 2310778,
        "login": "sethii",
        "display_login": "sethii",
        "gravatar_id": "",
        "url": "https://api.github.com/users/sethii",
        "avatar_url": "https://avatars.githubusercontent.com/u/2310778?"
    },
};


