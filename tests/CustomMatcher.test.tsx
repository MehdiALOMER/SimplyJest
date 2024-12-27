expect.extend({
    toBeBetween(received, min, max) {
        const pass = received >= min && received <= max;
        return {
            pass,
            message: () =>
                pass
                    ? `${received} ${min} ve ${max} arasında.`
                    : `${received} ${min} ve ${max} arasında değil.`,
        };
    },
});

// Test
test('Custom matcher: toBeBetween', () => {
    expect(5).toBeBetween(1, 10);
    expect(15).not.toBeBetween(1, 10);
});