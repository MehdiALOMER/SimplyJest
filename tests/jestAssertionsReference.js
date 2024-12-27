/**
 * Jest Assertion Yöntemleri - Referans Listesi
 * Jest ile sık kullanılan assertion yöntemleri ve örnek kullanımları
 */

// 1. Temel Eşitlik Kontrolleri
/**
 * `toBe` - Tam eşitlik kontrolü (===)
 * Kullanım: Değerin tam olarak eşit olup olmadığını kontrol eder.
 */
expect(2 + 2).toBe(4); // Passes
expect('merhaba').toBe('merhaba'); // Passes

/**
 * `toEqual` - Objeleri ve dizileri derin eşitlik ile karşılaştırır
 * Kullanım: Nesnelerin içeriğini karşılaştırır.
 */
expect({ a: 1 }).toEqual({ a: 1 }); // Passes
expect([1, 2]).toEqual([1, 2]); // Passes

/**
 * `toStrictEqual` - `toEqual` ile benzer ama daha sıkı kontrol yapar
 * Kullanım: Gereksiz veya eksik özellikleri de kontrol eder.
 */
expect({ a: 1 }).toStrictEqual({ a: 1 }); // Passes

// 2. Boolean (Mantıksal) Kontroller
/**
 * `toBeTruthy` - Değerin "truthy" olduğunu kontrol eder
 * Kullanım: JavaScript'teki truthy değerlere (ör. dolu string) izin verir.
 */
expect(true).toBeTruthy(); // Passes
expect('non-empty string').toBeTruthy(); // Passes

/**
 * `toBeFalsy` - Değerin "falsy" olduğunu kontrol eder
 * Kullanım: JavaScript'teki falsy değerlere (ör. null, 0) izin verir.
 */
expect(false).toBeFalsy(); // Passes
expect(null).toBeFalsy(); // Passes

// 3. Sayısal Karşılaştırmalar
/**
 * `toBeGreaterThan` - Bir değerin belirli bir sayıdan büyük olduğunu kontrol eder
 */
expect(10).toBeGreaterThan(5); // Passes

/**
 * `toBeLessThan` - Bir değerin belirli bir sayıdan küçük olduğunu kontrol eder
 */
expect(3).toBeLessThan(5); // Passes

/**
 * `toBeGreaterThanOrEqual` - Büyük veya eşit olup olmadığını kontrol eder
 */
expect(5).toBeGreaterThanOrEqual(5); // Passes

/**
 * `toBeLessThanOrEqual` - Küçük veya eşit olup olmadığını kontrol eder
 */
expect(5).toBeLessThanOrEqual(5); // Passes

// 4. Dizi ve String Kontrolleri
/**
 * `toContain` - Bir dizinin veya string'in belirli bir değeri içerip içermediğini kontrol eder
 */
expect([1, 2, 3]).toContain(2); // Passes
expect('Merhaba Jest').toContain('Jest'); // Passes

/**
 * `toContainEqual` - Bir dizinin belirli bir nesneyi içerip içermediğini kontrol eder
 */
expect([{ a: 1 }, { b: 2 }]).toContainEqual({ a: 1 }); // Passes

// 5. Hata Kontrolleri
/**
 * `toThrow` - Bir fonksiyonun hata fırlatıp fırlatmadığını kontrol eder
 */
const hataFırlat = () => {
    throw new Error('Bir hata oluştu!');
};
expect(hataFırlat).toThrow(); // Passes
expect(hataFırlat).toThrow('Bir hata oluştu!'); // Passes

/**
 * `toThrowError` - Daha spesifik hata kontrolü sağlar
 */
expect(() => {
    throw new TypeError('Yanlış tür');
}).toThrowError(TypeError); // Passes

// 6. Asenkron Kontroller
/**
 * `resolves` - Bir Promise'in başarılı şekilde çözülüp çözülmediğini kontrol eder
 */
const başarıPromise = Promise.resolve('tamamlandı');
await expect(başarıPromise).resolves.toBe('tamamlandı'); // Passes

/**
 * `rejects` - Bir Promise'in reddedilip reddedilmediğini kontrol eder
 */
const hataPromise = Promise.reject(new Error('başarısız'));
await expect(hataPromise).rejects.toThrow('başarısız'); // Passes

// 7. Snapshot Testleri
/**
 * `toMatchSnapshot` - Önceden kaydedilen snapshot ile karşılaştırır
 */
expect({ kullanıcı: 'Ahmet', yaş: 30 }).toMatchSnapshot(); // Snapshot kaydedilir veya karşılaştırılır

/**
 * `toMatchInlineSnapshot` - Snapshot'ı kod içine gömerek saklar
 */
expect({ kullanıcı: 'Ahmet', yaş: 30 }).toMatchInlineSnapshot(`
  Object {
    "yaş": 30,
    "kullanıcı": "Ahmet",
  }
`);

// 8. Diğer Kullanışlı Kontroller
/**
 * `toHaveLength` - Dizinin veya string'in uzunluğunu kontrol eder
 */
expect([1, 2, 3]).toHaveLength(3); // Passes
expect('hello').toHaveLength(5); // Passes

/**
 * `toHaveProperty` - Bir nesnede belirli bir özelliğin olup olmadığını kontrol eder
 */
expect({ isim: 'Ali', yaş: 25 }).toHaveProperty('isim'); // Passes
expect({ isim: 'Ali', yaş: 25 }).toHaveProperty('yaş', 25); // Passes

/**
 * `toMatch` - Bir string'in bir düzenli ifadeye (RegEx) uyup uymadığını kontrol eder
 */
expect('Merhaba dünya').toMatch(/dünya/); // Passes

/**
 * `not` - Bir kontrolü tersine çevirir (negatif kontrol)
 */
expect(5).not.toBe(10); // Passes
expect('Merhaba').not.toContain('Dünya'); // Passes