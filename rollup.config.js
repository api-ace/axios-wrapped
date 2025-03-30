import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { dts } from "rollup-plugin-dts";
import { babel } from '@rollup/plugin-babel';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import autoExternal from "rollup-plugin-auto-external";

const jsConfig = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: "dist/index.min.js",
      format: "umd",
      exports: "named",
      name: "axiosWrapped",
      globals: { 'axios': "axios" },
      plugins:[
        resolve({browser:true}),    
      ]
    },
  ],
  plugins: [
    autoExternal(),
    resolve(),
    commonjs(),
    json(),
    nodePolyfills(),
    terser(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false, // Prevents only emitting types
      outDir: "dist", // Ensures output goes to dist
      sourceMap: true,
    }),
  ],
  external: ['axios']
};

const dtsConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es', // Ensure the output format is ES module
  },
  plugins: [dts()],
};

export default [jsConfig, dtsConfig];