import React from 'react';
import { mount } from 'enzyme';
import Root from './../Root';
import App from './../components/App';
import moxios from 'moxios';

beforeEach(() => {
    moxios.install();
    moxios.stubRequest('https://chat-collab.firebaseio.com/channels.json', {
        status: 200,
        response: [{channelId: 1, channelName: 'xxx'},{channelId: 2, channelName: 'fff'}]
    });
});

afterEach(() => {
    moxios.uninstall();
})

xit('can fetch list of rooms and display it', () => {
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );
    setTimeout(() => {
        expect(wrapped.find('li').length).toEqual(2);
        done();
    }, 100);
});
