import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function FetchData(): JSX.Element {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const result = await response.json();
            setData(result.title);
        } catch (error) {
            setData('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Fetch Data" onPress={fetchData} testID="fetchButton" />
            {loading && <Text testID="loadingText">Loading...</Text>}
            {data && <Text testID="dataText">{data}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});