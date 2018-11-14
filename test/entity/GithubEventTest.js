'use strict';

import {GithubEvent} from '../../src/entity/GithubEvent';
const expect = require('chai').expect;

describe('GithubEventTest', function () {
   it('test valid creation of obj', function () {
       const validResponse = {
           payload: {},
           repo: {},
           type: 'fake',
           created_at: '2066-06-06',
       };
       const validGithubEvent = new GithubEvent(validResponse);

       expect(validGithubEvent).to.be.instanceOf(GithubEvent);
   });

   it('test invalid creation of obj', function () {
       let thrown;

       try {
           new GithubEvent('some invalid string');
       } catch (e) {
           expect(e.message).to.be.equal('Invalid responseBody');
           thrown = true;
       }

       expect(thrown).to.be.true;
   });
});


