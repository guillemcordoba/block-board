import { LitElement, html, property } from "lit-element";
import { Block } from "./block";
import { sharedStyles } from "./sharedStyles";

export class BlockSandboxBlockSelector extends LitElement {
  static styles = sharedStyles;

  @property({ type: Array }) private availableBlocks: Array<Block> = [];

  onDragStart(e: DragEvent, block: Block) {
    e.dataTransfer?.setData("blockName", block.name);
  }

  render() {
    return html`
      <div class="column">
        ${this.availableBlocks.map(
          (block) =>
            html`<span
              draggable="true"
              @dragstart=${(e: DragEvent) => this.onDragStart(e, block)}
              >${block.name}
            </span>`
        )}
      </div>
    `;
  }
}

customElements.define(
  "block-sandbox-block-selector",
  BlockSandboxBlockSelector
);
