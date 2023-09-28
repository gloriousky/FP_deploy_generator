const files = import.meta.globEager("../providers/*.js");

const provoders = {
  install: (app) => {
    for (let path in files) {
      for (let fn in files[path]) {
        const instance = files[path][fn]();
        if ("install" in instance) {
          app.use(instance);
        }
      }
    }
  },
};

export default provoders;
