export function generatePassword(n: number): string {
    if (n < 4) {
        throw new Error(
            'Password length must be at least 4 to include all required character types.',
        );
    }

    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    const getRandomChar = (str: string) =>
        str[Math.floor(Math.random() * str.length)];

    let password = [
        getRandomChar(lowerCaseLetters),
        getRandomChar(upperCaseLetters),
        getRandomChar(numbers),
        getRandomChar(specialCharacters),
    ];

    const allCharacters =
        lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

    for (let i = password.length; i < n; i++) {
        password.push(getRandomChar(allCharacters));
    }

    // Shuffle the password array to ensure randomness
    password = password.sort(() => Math.random() - 0.5);

    return password.join('');
}
