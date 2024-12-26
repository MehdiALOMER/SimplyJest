import { View, Switch, Text } from 'react-native';
import { useState } from 'react';

export default function Settings(): JSX.Element {
    const [isEnabled, setIsEnabled] = useState<boolean>(false);

    return (
        <View>
            <Text>Enable Notifications</Text>
            <Switch
                value={isEnabled}
                onValueChange={setIsEnabled}
                testID="notificationSwitch"
            />
        </View>
    );
}