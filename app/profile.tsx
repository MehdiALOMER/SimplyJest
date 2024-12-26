import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function Profile(): JSX.Element {
    const [name, setName] = useState<string>('');

    const handleSubmit = () => {
        alert(`Hello, ${name}`);
    };

    return (
        <View>
            <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                testID="nameInput"
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}