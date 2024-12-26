import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter(): JSX.Element {
    const [count, setCount] = useState<number>(0);

    return (
        <View style={styles.container}>
            {/* Sayaç için testID ekleniyor */}
            <Text style={styles.counterText} testID="counterText">Count: {count}</Text>
            <View style={styles.buttonContainer}>
                <Button title="+" onPress={() => setCount(count + 1)} testID="incrementButton" />
                <Button title="-" onPress={() => setCount(count - 1)} testID="decrementButton" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '50%',
    },
});