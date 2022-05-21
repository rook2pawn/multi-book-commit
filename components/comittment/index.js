const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

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
      committed: { uncommit: "none", partial: "partial" },
    });
    this.fsm = commitmentState;
  }

  createElement({ state, emit }) {
    return html`<div class="commit ${this.fsm.state}">
      Commitment status
      <span>${this.fsm.state}</span>
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
