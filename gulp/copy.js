import { src, dest } from 'gulp';
import config from './config';

export const copyFonts = () => src(config.fonts.src)
  .pipe(dest(config.fonts.dist));

export const copyImages = () => src(config.images.src)
  .pipe(dest(config.images.dist));

export const copyHtml = () => src(config.html.src)
  .pipe(dest(config.html.dist));