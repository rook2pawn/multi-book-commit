const html = require("nanohtml");
const CommitmentMgr = require("../components/comittmentManager");

function mainView(state, emit) {
  console.log("MAINVIEW!!");
  const cMgr = new CommitmentMgr();
  return html`<body>
    <div>
      <h4>MultiBooking Lock</h4>
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
