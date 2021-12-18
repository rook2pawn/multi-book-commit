const choo = require("choo");
const html = require("nanohtml");
const devtools = require("choo-devtools");

const css = require("sheetify");
css("./app.css");

module.exports = () => {
  const app = choo();

  app.use(devtools());
  app.use((state) => {
    state.logger = false;
  });
  function mainView(state, emit) {
    return html`<body>
      <div><h4>Choo App Starter</h4></div>
    </body>`;
  }
  app.route("/", mainView);
  app.use((state, emitter) => {});
  app.mount("body");
};
