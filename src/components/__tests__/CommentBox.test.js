import React from 'react';
import { mount } from 'enzyme';
import Root from './../../Root';
import CommentBox from './../CommentBox';

let wrapped;

beforeEach(() => {
    wrapped = mount(<Root><CommentBox /></Root>);
});

afterEach(() => {
    wrapped.unmount();
});

it('has a text area and a button', () => {
    expect(wrapped.find('textarea').length).toEqual(1);
    expect(wrapped.find('button').length).toEqual(1);
});

describe('textarea', () => {

    beforeEach(() => {
        wrapped.find('textarea').simulate('change', { target: { value: 'xxx' } });
        wrapped.update();
    });

    it('can be used to type some value', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('xxx');
    });
    
    it('is cleaned after submitting form', () => {
        wrapped.find('form').simulate('submit');
        wrapped.update();
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    });

});

