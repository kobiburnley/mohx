module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: true, optionalDependencies: true, peerDependencies: true },
    ],
    "import/no-unresolved": 0,
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
}
