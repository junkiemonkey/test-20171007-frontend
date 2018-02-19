import browserSync from 'browser-sync';
import config from './config';

const server = browserSync.create();

export default {
  init() {
    server.init({
      notify: false,
      server: `./${config.dist}`
    })
  },
  watch: server.watch,
  reload: server.reload,
  stream: server.stream
}