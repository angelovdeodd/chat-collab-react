import React from 'react';
import { mount } from 'enzyme';
import Root from './../../Root';
import CommentList from './../CommentList';

let wrapped;

beforeEach(() => {
    const initialState = {
        comments: ['comment1', 'comment2']
    }
    wrapped = mount(<Root initialState={initialState}><CommentList /></Root>);
})

it('shows one li element per comment', () => {
    expect(wrapped.find('li').length).toEqual(2);
});

it('shows text of each comment', () => {
    expect(wrapped.render().text()).toContain('comment1');
    expect(wrapped.render().text()).toContain('comment2');
});
