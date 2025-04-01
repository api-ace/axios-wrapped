import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import  terser  from '@rollup/plugin-terser';
import { dts } from "rollup-plugin-dts";
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
      sourcemap: true,
    },
  ],
  plugins: [
    autoExternal(),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    json(),
    nodePolyfills(),
    typescript({
      outputToFilesystem:true,
      tsconfig: "./tsconfig.json",
      declaration: false, 
      outDir: "dist",
      sourceMap: true, 
    }),
    terser({
      mangle:{
        reserved:['TypeMismatchException']
      }
    }),
  ],
  external: ['axios']
};

const dtsConfig = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es', 
  },
  plugins: [dts({
    tsconfig: "./tsconfig.json"
  })],
};

export default [jsConfig, dtsConfig];