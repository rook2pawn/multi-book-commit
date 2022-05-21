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
    this.fsm = nanostate("nogo", {});

    /*
    this.fsm = nanostate("nogo", {
      "nogo" :{   "go" : "go" },
  "go" : {"nogo" : "nogo"}})
*/
  }

  createElement({ state, emit }) {
    return html`<div class="">Greenlight</div>`;
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
