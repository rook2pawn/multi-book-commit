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
      <div>
        <h4>Choo App Starter</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </body>`;
  }
  function aboutView(state, emit) {
    return html`<body>
      <div>
        <h4>About Page</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </div>
    </body>`;
  }
  app.route("/", mainView);
  app.route("/about", aboutView);
  app.use((state, emitter) => {});
  app.mount("body");
};
