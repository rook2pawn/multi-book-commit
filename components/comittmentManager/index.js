const Nanocomponent = require("nanocomponent");
const html = require("choo/html");
const css = require("sheetify");
const nanostate = require("nanostate");

const FSMControls = require("../../fsmControls");
const FSMRender = require("../../fsmRender");
const Commitment = require("../comittment");

css("./component.css");

class Component extends Nanocomponent {
  constructor() {
    super();
    this._loadedResolve;
    this.loaded = new Promise((resolve, reject) => {
      this._loadedResolve = resolve;
    });
    this.jobCommitments = [];
  }

  createElement({ state, emit }) {
    return html`<div class="">
      Card
      <div>
        <input
          type="button"
          value="click me"
          onclick=${() => {
            this.rerender();
          }}
        />
        <input
          type="button"
          value="click me for whole redraw"
          onclick=${() => {
            emit("render");
          }}
        />
      </div>
      <div>
      <input type='button' value='Add job' onclick=${() => {
        this.addJob();
        this.rerender();
      }}>
      </div>
      <div class="commitmentGroup">
      ${this.jobCommitments.map(({ commitment }) => {
        return html`<div>${commitment.render({ state, emit })}</div> `;
      })}
      </div>
      </div>
    </div>`;
  }

  addJob() {
    /*
                ${this.commitment_fsmControls.render({ state, emit })}
            ${this.commitment_fsmRender.render({ state, emit })}

    */
    const commitment = new Commitment();
    this.jobCommitments.push({ commitment });
    /*
    this.commitment_fsmRender = new FSMRender({
      fsm: this.commitment,
      render: () => {
        this.rerender();
      },
    });
    this.commitment_fsmControls = new FSMControls({
      fsm: this.commitment,
      render: () => {
        this.rerender();
      },
    });
    */
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