import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      // ✅ 올바른 위치
      'no-console': 'error', // 🚨 console.log 사용 시 에러 발생
      'import/no-anonymous-default-export': 'off',
    },
  },
];

export default eslintConfig;
