import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import jQuery from 'jquery';

export default [
  {
    input: './src/index.jsx',
    external: ['jquery', 'react'], // Add 'react' to the list of externals
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        globals: {
          jquery: '$',
          react: 'React', // Specify global variable name for 'react'
        }
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
        globals: {
          jquery: '$',
          react: 'React', // Specify global variable name for 'react'
        }
      },
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      external(),
      resolve({
        preferBuiltins: false,
      }),
      terser(),
      commonjs({
        include: "/node_modules/",
        requireReturnsDefault: 'auto',
      }),
    ],
  }
];
