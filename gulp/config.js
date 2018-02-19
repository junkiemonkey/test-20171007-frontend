const src = 'src';
const dist = 'dist';

export default {
  dist: `${dist}`,
  js: {
    src: `${src}/js/**/*.js`,
    dist: `${dist}/js/`
  },
  css: {
    src: `${src}/sass/**/*.scss`,
    dist: `${dist}/css/`
  },
  images: {
    src: `${src}/images/**/*.*`,
    dist: `${dist}/images/`
  },
  fonts: {
    src: `${src}/fonts/**/*.*`,
    dist: `${dist}/fonts/`
  },
  html: {
    src: `${src}/*.html`,
    dist: `${dist}/`
  },
  isProduction: false,
  useBabel: false
}
