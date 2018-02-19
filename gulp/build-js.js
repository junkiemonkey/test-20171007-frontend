import { src, dest } from 'gulp';
import load from 'gulp-load-plugins';
import server from './server';
import config from './config';

const plugin = load();

export const buildJs = () => src(config.js.src)
  .pipe(plugin.plumber())
  .pipe(plugin.newer(config.js.dist))
  .pipe(plugin.if(!config.isProduction, plugin.sourcemaps.init()))
  .pipe(plugin.concat('bundle.js'))
  .pipe(plugin.babel({
    compact: false,
    presets: ['env']
  }))
  .pipe(plugin.if(!config.isProduction, plugin.sourcemaps.write('.')))
  .pipe(plugin.if(config.isProduction, plugin.uglify()))
  .pipe(dest(config.js.dist))
  .pipe(server.stream());

export const buildVendors = () => src([
  './node_modules/jquery/dist/jquery.js'
])
  .pipe(plugin.concat('vendors.js'))
  .pipe(plugin.uglify())
  .pipe(dest(config.js.dist));