import React from 'react';
import renderer, { act } from 'react-test-renderer'; // Renderer ile bileşeni render ediyoruz
import Counter from '../app/counter';

describe('Counter Screen', () => {
    // Snapshot Testi
    it('renders correctly', () => {
        const tree = renderer.create(<Counter />).toJSON();
        expect(tree).toMatchSnapshot(); // İlk render edilen hali test ediyoruz
    });

    // Etkileşim Testi: Sayacı artırma
    it('increments the counter when "+" button is pressed', () => {
        const component = renderer.create(<Counter />);
        const incrementButton = component.root.findByProps({ testID: 'incrementButton' });

        act(() => incrementButton.props.onPress()); // "+" butonuna basıyoruz

        const counterText = component.root.findByProps({ testID: 'counterText' });
        expect(counterText.props.children).toContain(1); // Sayaç 1 olmalı
    });

    // Etkileşim Testi: Sayacı azaltma
    it('decrements the counter when "-" button is pressed', () => {
        const component = renderer.create(<Counter />);
        const decrementButton = component.root.findByProps({ testID: 'decrementButton' });

        act(() => decrementButton.props.onPress()); // "-" butonuna basıyoruz

        const counterText = component.root.findByProps({ testID: 'counterText' });
        expect(counterText.props.children).toContain(-1); // Sayaç -1 olmalı
    });
});

// 