import React from 'react';
import renderer, { act } from 'react-test-renderer'; // Testler için react-test-renderer ve act fonksiyonu
import Login from '../app/Login'; // Test edeceğimiz Login bileşeni

// Mock fetch ve localStorage
global.fetch = jest.fn(); // fetch'i mock'layarak sahte API çağrıları yapmamızı sağlıyor
const localStorageMock = (() => {
    // Mock bir localStorage oluşturuyoruz
    let store: Record<string, string> = {}; // localStorage'ın içini bir obje olarak tutuyor
    return {
        setItem: (key: string, value: string) => {
            store[key] = value; // Anahtar-değer çiftini kaydediyor
        },
        getItem: (key: string) => store[key] || null, // Anahtara göre değer döndürüyor
        clear: () => {
            store = {}; // Tüm içeriği temizliyor
        },
    };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock }); // global.localStorage'ı mock ile değiştiriyoruz

describe('Login Component', () => {
    beforeEach(() => {
        // Her testten önce fetch mock'u ve localStorage'ı sıfırlıyoruz
        (fetch as jest.Mock).mockClear(); // fetch çağrılarını temizle
        localStorage.clear(); // localStorage'ı temizle
    });

    it('shows error for invalid email', async () => {
        // Geçersiz bir email adresi girildiğinde doğru hata mesajını gösteriyor
        const component = renderer.create(<Login />); // Login bileşenini render ediyoruz
        const emailInput = component.root.findByProps({ testID: 'emailInput' }); // Email giriş alanını buluyoruz
        const loginButton = component.root.findByProps({ testID: 'loginButton' }); // Login butonunu buluyoruz

        act(() => emailInput.props.onChangeText('')); // Email alanını boş bırakıyoruz
        await act(async () => loginButton.props.onPress()); // Login butonuna tıklıyoruz

        const errorText = component.root.findByProps({ testID: 'errorText' }); // Hata mesajını buluyoruz
        expect(errorText.props.children).toBe('Geçerli bir email adresi giriniz!'); // Doğru hatayı kontrol ediyoruz
    });


    it('shows error for short password', async () => {
        // Kısa bir şifre girildiğinde doğru hata mesajını gösteriyor
        const component = renderer.create(<Login />); // Login bileşenini render ediyoruz
        const emailInput = component.root.findByProps({ testID: 'emailInput' }); // Email giriş alanını buluyoruz
        const passwordInput = component.root.findByProps({ testID: 'passwordInput' }); // Şifre giriş alanını buluyoruz
        const loginButton = component.root.findByProps({ testID: 'loginButton' }); // Login butonunu buluyoruz

        act(() => emailInput.props.onChangeText('test@example.com')); // Geçerli bir email giriyoruz
        act(() => passwordInput.props.onChangeText('123')); // Kısa bir şifre giriyoruz
        await act(async () => loginButton.props.onPress()); // Login butonuna tıklıyoruz

        const errorText = component.root.findByProps({ testID: 'errorText' }); // Hata mesajını buluyoruz
        expect(errorText.props.children).toBe('Şifre en az 6 karakter olmalıdır!'); // Hata mesajını doğruluyoruz
    });


    it('saves token on successful login', async () => {
        // Başarılı giriş durumunda token'ın kaydedildiğini kontrol ediyor
        (fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: true, // API çağrısı başarılı
                json: () => Promise.resolve({ token: 'mocked-token' }), // Sahte bir token döndürüyoruz
            })
        );

        const component = renderer.create(<Login />); // Login bileşenini render ediyoruz
        const emailInput = component.root.findByProps({ testID: 'emailInput' }); // Email giriş alanını buluyoruz
        const passwordInput = component.root.findByProps({ testID: 'passwordInput' }); // Şifre giriş alanını buluyoruz
        const loginButton = component.root.findByProps({ testID: 'loginButton' }); // Login butonunu buluyoruz

        act(() => emailInput.props.onChangeText('test@example.com')); // Email alanına geçerli bir email yazıyoruz
        act(() => passwordInput.props.onChangeText('password123')); // Şifre alanına geçerli bir şifre yazıyoruz

        await act(async () => loginButton.props.onPress()); // Login butonuna tıklıyoruz ve asenkron işlemi bekliyoruz

        expect(localStorage.getItem('token')).toBe('mocked-token'); // Token'ın localStorage'a kaydedildiğini kontrol ediyoruz
        const successText = component.root.findByProps({ testID: 'successText' }); // Başarı mesajını buluyoruz
        expect(successText.props.children).toBe('Giriş başarılı!'); // Başarı mesajının doğru olduğunu kontrol ediyoruz
    });

    it('shows error when API call fails', async () => {
        // Başarısız giriş durumunda doğru hata mesajını gösteriyor
        (fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false, // API çağrısı başarısız
                json: () => Promise.resolve({ message: 'Invalid credentials' }), // Hata mesajı döndürüyoruz
            })
        );

        const component = renderer.create(<Login />); // Login bileşenini render ediyoruz
        const emailInput = component.root.findByProps({ testID: 'emailInput' }); // Email giriş alanını buluyoruz
        const passwordInput = component.root.findByProps({ testID: 'passwordInput' }); // Şifre giriş alanını buluyoruz
        const loginButton = component.root.findByProps({ testID: 'loginButton' }); // Login butonunu buluyoruz

        act(() => emailInput.props.onChangeText('test@example.com')); // Email alanına geçerli bir email yazıyoruz
        act(() => passwordInput.props.onChangeText('password123')); // Şifre alanına geçerli bir şifre yazıyoruz

        await act(async () => loginButton.props.onPress()); // Login butonuna tıklıyoruz ve asenkron işlemi bekliyoruz

        const errorText = component.root.findByProps({ testID: 'errorText' }); // Hata mesajını buluyoruz
        expect(errorText.props.children).toBe('Invalid credentials'); // Hata mesajının doğru olduğunu kontrol ediyoruz
    });
});

// npx jest tests/Login.test.tsx