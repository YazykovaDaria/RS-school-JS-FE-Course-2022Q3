module.exports = {
    "plugins": ["import", "@typescript-eslint", "only-warn"],
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "ignorePatterns": ["vite.config.js", ".eslintrc.cjs", "/dist/"],
    "rules": {
        "no-debugger": "off",
        "no-console": 0,
        "@typescript-eslint/no-explicit-any": "warn",
        "class-methods-use-this": "off"
    },
}
