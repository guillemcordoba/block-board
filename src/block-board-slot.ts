import { html, LitElement, property, query } from "lit-element";
import { Scoped } from "scoped-element-mixin";
import { Block } from "./block";

export class BlockBoardSlot extends Scoped(LitElement) {
  @property({ type: Object })
  block!: Block;

  @query("#slot")
  _slot!: HTMLElement;

  firstUpdated() {
    this.block.render(this.shadowRoot.customElements, this.shadowRoot);
  }

  render() {
    return html``;
  }
}
