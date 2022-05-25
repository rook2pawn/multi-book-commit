const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

const FSMControls = require("../../fsmControls");
const FSMRender = require("../../fsmRender");

css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    const commitmentState = nanostate("none", {
      none: { partial: "partial", commit: "committed" },
      partial: { uncommit: "none", commit: "committed" },
      committed: { uncommit: "none", partial: "partial", lockin: "locked" },
      locked: {},
    });
    this.fsm = commitmentState;
    this.commitment_fsmRender = new FSMRender({
      fsm: commitmentState,
    });
    this.commitment_fsmControls = new FSMControls({
      fsm: commitmentState,
      render: () => {
        this.rerender();
      },
    });
  }

  createElement({ state, emit }) {
    return html`<div class="commit ${this.fsm.state}">
      Commitment status
      <span>${this.fsm.state}</span>
      ${this.commitment_fsmControls.render({ state, emit })}
      ${this.commitment_fsmRender.render({ state, emit })}
    </div>`;
  }

  load(el) {
    this.el = el;
    this._loadedResolve();
  }

  update({ state, emit }) {
    return true;
  }
}

module.exports = exports = Component;
