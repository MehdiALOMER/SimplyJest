import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Countdown = () => {
    const [seconds, setSeconds] = useState<number>(10); // Başlangıç zamanı
    const [isActive, setIsActive] = useState<boolean>(false); // Zamanlayıcının aktif olup olmadığını kontrol eder

    useEffect(() => {
        let timer: NodeJS.Timeout; // Zamanlayıcı değişkeni
        if (isActive && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1); // Her saniyede bir geri sayımı azaltır
            }, 1000);
        }
        if (seconds === 0) {
            setIsActive(false); // Sıfıra ulaşıldığında durdur
        }

        return () => clearInterval(timer); // Bileşen kapatıldığında zamanlayıcıyı temizler
    }, [isActive, seconds]);

    const handleStart = () => {
        setIsActive(true); // Zamanlayıcıyı başlatır
    };

    const handleReset = () => {
        setIsActive(false); // Zamanlayıcıyı durdurur
        setSeconds(10); // Zamanı sıfırlar
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timer} testID="countdownText">{seconds > 0 ? seconds : "Time's up!"}</Text>
            <Button title="Start" onPress={handleStart} />
            <Button title="Reset" onPress={handleReset} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        fontSize: 48,
        marginBottom: 20,
    },
});

export default Countdown;