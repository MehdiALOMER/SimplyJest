import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // E-posta validasyonu için regex
    const isValidEmail = (email: string): boolean =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Şifre minimum uzunluk kontrolü
    const isValidPassword = (password: string): boolean =>
        password.length >= 6;

    const handleLogin = async () => {
        setError(null); // Önceki hataları sıfırla
        setSuccess(false); // Başarı durumunu sıfırla

        // Email kontrolü: Boş mu, geçerli formatta mı?
        if (!email) {
            setError('Geçerli bir email adresi giriniz!');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Geçerli bir email adresi giriniz!');
            return;
        }

        // Şifre kontrolü: Boş mu, kısa mı?
        if (!password) {
            setError('Şifre alanı boş olamaz!');
            return;
        }

        if (!isValidPassword(password)) {
            setError('Şifre en az 6 karakter olmalıdır!');
            return;
        }

        try {
            const response = await fetch('https://example.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Giriş başarısız!');
            }

            const { token } = await response.json();
            localStorage.setItem('token', token); // Token saklanıyor
            setSuccess(true);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                testID="emailInput"
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                testID="passwordInput"
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} testID="loginButton" />
            {error && <Text style={styles.errorText} testID="errorText">{error}</Text>}
            {success && <Text style={styles.successText} testID="successText">Giriş başarılı!</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
});