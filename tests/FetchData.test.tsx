import React from 'react';
import renderer, { act } from 'react-test-renderer';
import FetchData from '../app/fetchData';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ title: 'Mocked Title' }),
    })
) as jest.Mock;

describe('FetchData Screen', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<FetchData />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('displays loading text when fetching data', async () => {
        const component = renderer.create(<FetchData />);
        const fetchButton = component.root.findByProps({ testID: 'fetchButton' });

        // Fetch butonuna basıldığında loading text gösterilmeli
        await act(async () => fetchButton.props.onPress());
        const loadingText = component.root.findByProps({ testID: 'dataText' });
        expect(loadingText.props.children).toBe('Mocked Title');
    });

    it('displays data when fetch is complete', async () => {
        const component = renderer.create(<FetchData />);
        const fetchButton = component.root.findByProps({ testID: 'fetchButton' });

        await act(async () => fetchButton.props.onPress());
        const dataText = component.root.findByProps({ testID: 'dataText' });
        expect(dataText.props.children).toBe('Mocked Title');
    });
});