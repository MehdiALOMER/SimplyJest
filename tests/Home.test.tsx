import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../app/index';

describe('Home Screen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<Home />).toJSON();
        expect(tree).toMatchSnapshot(); // Snapshot testi
    });
});

// npx jest tests/Home.test.tsx