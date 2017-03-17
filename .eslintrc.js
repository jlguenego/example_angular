module.exports = {
    extends: 'google',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'script',
    },
    rules: {
        'no-var': 0,
        'prefer-rest-params': 0,
        'max-len': ['error', 120],
        'comma-dangle': 0,
        'require-jsdoc': 0,
        'padded-blocks': 0,
        'prefer-spread': 0,
    },
};
