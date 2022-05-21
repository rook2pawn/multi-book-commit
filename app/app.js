const choo = require("choo");
const devtools = require("choo-devtools");
const css = require("sheetify");
const { mainView } = require("../views");

css("./app.css");

module.exports = () => {
  const app = choo();

  app.use(devtools());
  app.use((state) => {
    state.logger = false;
  });
  app.route("/", mainView);

  app.use((state, emitter) => {});

  app.mount("body");
};
