'use strict';

import {Profile} from "../../src/components/Profile";
import {GithubUser} from "../../src/entity/GithubUser";
const expect = require('chai').expect;

describe('ProfileComponentTest', function () {
    it('test append method', function () {
        const validResponse = {
            name: 'baboon',
            bio: "I'r baboon",
            avatar_url: 'https://fakeadress.com/avatar.png',
            html_url: 'https://fakeadress.com/index.html',
            login: 'baboonX'
        };
        const expectedHTML = '<h2 class="subtitle is-4"></h2><div class="profile"><div class="media"><div class="media-left"><figure class="media-left image is-64x64"><img id="profile-image" src="https://fakeadress.com/avatar.png"></figure></div><div class="media-left"><div class="title is-5" id="profile-name"></div><div class="subtitle is-6"><a href="https://fakeadress.com/index.html" id="profile-url"></a></div></div></div></div>';

        const user = new GithubUser(validResponse);
        const profile = new Profile(user, 'beforeRow');
        const htmlNode = document.getElementById('beforeRow');
        profile.appendHtml();
        expect(htmlNode.innerHTML).to.be.equal(expectedHTML);
    });

    it('test invalid creation', function () {
        let thrown;
        let thrown1;

        try {
            thrown = new Profile('some invalid string').user;
        } catch (e) {
            expect(e.message).to.be.equal('GithubUser is not instance of itself');
            thrown = true;
        }

        try {
            thrown1 = new Profile('some invalid string', 'fakeId').container;
        } catch (e) {
            expect(e.message).to.be.equal('containerId fakeId was not found');
            thrown1 = true;
        }

        expect(thrown).to.be.true;
        expect(thrown1).to.be.true;
    });
});
