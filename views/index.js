const html = require("nanohtml");
const CommitmentMgr = require("../components/comittmentManager");

function mainView(state, emit) {
  const cMgr = new CommitmentMgr();
  return html`<body>
    <div class="nav">
      <div class="logo">
        <h1>Launch Control</h1>
      </div>
      <div class="menu"></div>
    </div>
    <div class="main">
      <div class="banner">
        <h3>A system enabling multiple job committments</h3>
      </div>
      ${cMgr.render({ state, emit })}
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
