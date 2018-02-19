import { src, dest } from 'gulp';
import load from 'gulp-load-plugins';
import server from './server';
import config from './config';

const plugin = load();

export const buildCss = () => src(config.css.src)
  .pipe(plugin.plumber())
  .pipe(plugin.if(!config.isProduction, plugin.sourcemaps.init()))
  .pipe(plugin.sass().on('error', plugin.sass.logError))
  .pipe(plugin.autoprefixer({
    browsers:['last 2 versions']
  }))
  .pipe(plugin.if(!config.isProduction, plugin.sourcemaps.write()))
  .pipe(plugin.if(config.isProduction, plugin.cssmin()))
  .pipe(dest(config.css.dist))
  .pipe(server.stream());