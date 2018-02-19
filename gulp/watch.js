import { watch } from 'gulp';
import { buildCss } from './build-css';
import { buildJs } from './build-js';
import { copyFonts, copyHtml, copyImages } from './copy';
import config from './config';

export const devWatch = () => {
  watch(config.js.src, buildJs);
  watch(config.css.src, buildCss);
  watch(config.images.src, copyImages);
  watch(config.fonts.src, copyFonts);
  watch(config.html.src, copyHtml);
};


