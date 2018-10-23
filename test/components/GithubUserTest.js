'use strict';

import {GithubUser} from '../../src/components/GithubUser';
const expect = require('chai').expect;

describe('GithubUserTest', function () {
   it('test valid creation of obj', function () {
       const validResponse = {
           name: 'baboon',
           bio: "I'r baboon",
           avatar_url: "https://fakeadress.com/avatar.png",
           html_url: "https://fakeadress.com/index.html",
           login: "baboonX"
       };
       const validGithubUser = new GithubUser(validResponse);

       expect(validGithubUser).to.be.instanceOf(GithubUser);
   });

   it('test invalid creation of obj', function () {
       try {
           new GithubUser("some invalid string");
       } catch (e) {
           expect(e.message).to.be.equal('Invalid profileResponse');
           const thrown = true;
       }

       expect('boolean' === typeof thrown);
   });
});


