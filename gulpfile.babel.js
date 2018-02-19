import { parallel, series } from 'gulp';
import del from 'del';
import config from './gulp/config';
import server from './gulp/server';
import { devWatch } from './gulp/watch';
import { buildJs, buildVendors } from './gulp/build-js';
import { buildCss } from './gulp/build-css';
import { copyImages, copyHtml, copyFonts } from './gulp/copy';

const clean = () => del([config.dist]);

const setProduction = cb => {
  config.isProduction = true;
  config.useBabel = true;
  cb();
};

export const dev = series(clean,
  parallel(
    // buildVendors,
    buildJs,
    buildCss,
    copyImages,
    copyFonts,
    copyHtml
  ),
  parallel(server.init, devWatch)
);

export const build = series(clean,
  setProduction,
  series(
    // buildVendors,
    buildJs,
    buildCss,
    copyImages,
    copyFonts,
    copyHtml
  )
);