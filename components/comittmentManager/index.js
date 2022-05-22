const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

const Commitment = require("../comittment");
const Greenlight = require("../greenlight");

css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    this.jobCommitments = [];
    this.greenlight = new Greenlight({ jobCommitments: this.jobCommitments });
    this.greenlight.fsm.on("launched", () => {
      this.rerender();
    });
  }

  createElement({ state, emit }) {
    console.log("commitmentManager: createElement");
    const canAddJob = this.greenlight.fsm.state !== "launched";
    return html`<div class="cMgr">
      <div class="controls">
        <h2>Controls</h2>
        ${canAddJob
          ? html`
              <input
                type="button"
                value="Add job"
                onclick=${() => {
                  this.addJob();
                  this.rerender();
                }}
              />
            `
          : ""}
      </div>
      ${this.greenlight.render({ state, emit })}
      <div class="commitmentGroup">
        ${this.jobCommitments.map(({ commitment }) => {
          return html`<div>${commitment.render({ state, emit })}</div> `;
        })}
      </div>
    </div>`;
  }
  onAnyCommitmentChange(nextState) {
    this.greenlight.check();
  }

  addJob() {
    const commitment = new Commitment();
    commitment.fsm.onchange((nextState) => {
      this.onAnyCommitmentChange(nextState);
    });
    this.jobCommitments.push({ commitment });
    this.greenlight.check(); // we call it here as well because when we add a default commitment, it should be rechecked.
  }
  load(el) {
    this.el = el;
    this._loadedResolve();
  }

  update() {
    return false;
  }
}

module.exports = exports = Component;
