jest.useFakeTimers();

import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Countdown from '../app/Countdown';

describe('Countdown Component', () => {
    it('starts countdown correctly', () => {
        // Bileşeni render ediyoruz
        const component = renderer.create(<Countdown />);
        const instance = component.root;

        // "Start" butonunu bulup tıklıyoruz
        const startButton = instance.findByProps({ title: 'Start' });
        act(() => startButton.props.onPress());

        // Zamanlayıcıyı 5 saniye ileri sarıyoruz
        act(() => jest.advanceTimersByTime(5000));

        // Geri sayımın 5'e düştüğünü kontrol ediyoruz
        const timerText = instance.findByProps({ testID: 'countdownText' });
        expect(timerText.props.children).toBe(5);

        // Zamanlayıcıyı tamamen bitiriyoruz
        act(() => jest.advanceTimersByTime(5000));

        // Zaman dolduğunda ekranda "Time's up!" yazısını kontrol ediyoruz
        expect(timerText.props.children).toBe("Time's up!");
    });

    it('resets countdown correctly', () => {
        // Bileşeni render ediyoruz
        const component = renderer.create(<Countdown />);
        const instance = component.root;

        // "Start" butonunu bulup tıklıyoruz
        const startButton = instance.findByProps({ title: 'Start' });
        act(() => startButton.props.onPress());

        // Ardından "Reset" butonuna tıklıyoruz
        const resetButton = instance.findByProps({ title: 'Reset' });
        act(() => resetButton.props.onPress());

        // Geri sayımın sıfırlandığını kontrol ediyoruz
        const timerText = instance.findByProps({ testID: 'countdownText' });
        expect(timerText.props.children).toBe(10);
    });
});

// npx jest tests/Countdown.test.tsx



/* PASS  tests / Countdown.test.tsx    // Bu, test dosyasının başarıyla çalıştığını gösterir.
 Countdown Component             // Test edilen bileşenin adı (describe bloğu).

   √ starts countdown correctly(140 ms) // İlk test: Geri sayımın doğru başladığını kontrol ediyor.
                                          // Test 140 ms'de başarıyla tamamlandı.

   √ resets countdown correctly(3 ms)   // İkinci test: Geri sayımın sıfırlanmasının doğru çalıştığını kontrol ediyor.
                                          // Test sadece 3 ms'de başarıyla tamamlandı.

Test Suites: 1 passed, 1 total            // Test dosyalarının (test suite) sayısı.
// 1 test dosyası çalıştırıldı ve hepsi geçti.

Tests: 2 passed, 2 total            // Çalıştırılan toplam test sayısı.
// 2 test çalıştırıldı ve tümü başarıyla geçti.

Snapshots: 0 total                      // Snapshot testi olmadığı için toplam snapshot sayısı 0.

Time: 0.859 s, estimated 1 s       // Tüm testlerin tamamlanması 0.859 saniye sürdü.
                                          // Jest, testlerin yaklaşık 1 saniye süreceğini tahmin etmişti.

Ran all test suites matching / tests\\Countdown.test.tsx / i. // Jest'in çalıştırdığı dosyaların eşleşme modeli.
// `tests/Countdown.test.tsx` dosyası çalıştırıldı. */
