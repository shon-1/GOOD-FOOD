import argon2 from 'argon2';

export const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to hash password');
    }
};

export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await argon2.verify(hashedPassword, password);
        return isMatch;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to compare passwords');
    }
};
