import gulp from 'gulp';
import fs from 'fs-extra';

gulp.task('default', async function () {
  console.log('hello!');
});

const clear = gulp.task('clear', async function () {
  await fs.removeSync("./tsconfig.tsbuildinfo")
  await fs.emptyDir('./dist/')
  await fs.remove(".rollup.cache")
});

export {
  clear,
}
