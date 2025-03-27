import gulp from 'gulp';
import fs from 'fs-extra';

gulp.task('default', async function () {
  console.log('hello!');
});

const clear = gulp.task('clear', async function () {
  await fs.emptyDir('./dist/')
});

const bower = gulp.task('bower', async function () {
  const npm = JSON.parse(await fs.readFile('package.json'));
  const bower = JSON.parse(await fs.readFile('bower.json'));

  const fields = [
    'name',
    'description',
    'version',
    'homepage',
    'license',
    'keywords'
  ];

  for (let i = 0, l = fields.length; i < l; i++) {
    const field = fields[i];
    bower[field] = npm[field];
  }

  await fs.writeFile('bower.json', JSON.stringify(bower, null, 2));
});



const packageJSON = gulp.task('package', async function () {


});

const env = gulp.task('env', async function () {  
});

const version = gulp.series('bower', 'env', 'package');

export {
  bower,
  env,
  clear,
  version,
  packageJSON
}
