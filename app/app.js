const choo = require("choo");
const devtools = require("choo-devtools");
const { aboutView, mainView } = require("../views");
const css = require("sheetify");
css("./app.css");

module.exports = () => {
  const app = choo();

  app.use(devtools());
  app.use((state) => {
    state.logger = false;
  });
  app.route("/", mainView);
  app.route("/about", aboutView);
  app.route("/about/foo", aboutView);

  app.use((state, emitter) => {});

  app.mount("body");
};
