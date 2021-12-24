const html = require("nanohtml");

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

exports.mainView = mainView;
exports.aboutView = aboutView;
