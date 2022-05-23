const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");
const FSMRender = require("../../fsmRender");
const FSMControls = require("../../fsmControls");

css("./component.css");

class Component extends Nanocomponent {
  constructor({ jobCommitments }) {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    this.jobCommitments = jobCommitments;
    this.fsm = nanostate("nogo", {
      nogo: { go: "go" },
      go: { nogo: "nogo", launch: "launched" },
      launched: {},
    });
    this.fsm.guard("go", () => {
      return this.readyForLaunch();
    });
    this.fsm.guard("launch", () => {
      return this.jobCommitments.every(({ commitment }) => {
        const { fsm } = commitment;
        return fsm.state === "locked";
      });
    });
    this.fsm.event(
      "emergencyStop",
      nanostate("emergencyStopped", {
        emergencyStopped: { allclear: "nogo" },
      })
    );
    this.fsmRender = new FSMRender({
      fsm: this.fsm,
    });
    this.fsmControls = new FSMControls({
      fsm: this.fsm,
      render: () => {
        this.rerender();
      },
    });
  }

  createElement({ state, emit }) {
    return html`<div class="greenlight">
      ${this.fsmRender.render({ state, emit })}
      <div class="greenlightState ${this.fsm.state}">${this.fsm.state}</div>
      <div class="controls">${this.fsmControls.render({ state, emit })}</div>
    </div>`;
  }
  readyForLaunch() {
    return this.jobCommitments.every(({ commitment }) => {
      const { fsm } = commitment;
      return fsm.state === "committed" || fsm.state === "locked";
    });
  }

  check() {
    const isReadyForLaunch = this.readyForLaunch();
    if (isReadyForLaunch) {
      this.fsm.emit("go");
    } else {
      if (this.fsm.state !== "nogo") this.fsm.emit("nogo");
    }
    this.rerender();
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
