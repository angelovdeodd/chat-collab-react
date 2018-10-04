import React from 'react';
import { mount } from 'enzyme';
import Root from './../../Root';
import RoomsList from './../RoomsList';

let wrapped;

beforeEach(() => {
    //wrapped = mount(<Root><RoomsList /></Root>);
});

it('calls componentDidMount', () => {
    spyOn(RoomsList.prototype, 'componentDidMount');
    wrapped = mount(<Root><RoomsList /></Root>);
    expect(RoomsList.prototype.componentDidMount).toHaveBeenCalled();
});

it('should fire fetch action after mounted', () => {
    
    //expect(wrapped.props.fetchRooms).toHaveBeenCalled();
});