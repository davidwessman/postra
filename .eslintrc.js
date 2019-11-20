module.exports = {
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },

  root: true,

  env: {
    node: true
  },

  extends: [
    "plugin:vue/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/essential",
    "@vue/prettier",
    "@vue/typescript"
  ],

  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
