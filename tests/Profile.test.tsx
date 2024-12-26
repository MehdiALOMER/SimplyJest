import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Profile from '../app/profile';

describe('Profile Screen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Profile />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('handles input change correctly', () => {
        const component = renderer.create(<Profile />);
        const input = component.root.findByProps({ testID: 'nameInput' });

        act(() => {
            input.props.onChangeText('John Doe');
        });

        expect(input.props.value).toBe('John Doe'); // Kullanıcı adı değişimini test ediyor
    });
});