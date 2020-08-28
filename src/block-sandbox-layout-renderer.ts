import { LitElement, html, property, TemplateResult, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { styleMap } from "lit-html/directives/style-map";
import { BlockLayoutNode, Block, BlockSlot } from "./block";
import { sharedStyles } from "./sharedStyles";

export class BlockSandboxLayoutRenderer extends LitElement {
  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
      }
    `,
  ];

  @property({ type: Array }) availableBlocks!: Array<Block>;
  @property({ type: Object }) blockLayout!: BlockLayoutNode;

  renderSlot(slot: BlockSlot): TemplateResult {
    if (typeof slot === "string") {
      const block = this.availableBlocks.find((block) => block.name === slot);
      if (!block) throw new Error(`Trying to render an unexisting block`);
      return block.render();
    } else if (slot !== undefined) {
      return this.renderNode(slot);
    } else {
      return html``;
    }
  }

  renderNode(blockLayout: BlockLayoutNode): TemplateResult {
    return html`
      <div
        class=${classMap({
          row: blockLayout.direction === "horizontal",
          column: blockLayout.direction === "vertical",
        })}
        style="flex: 1;"
      >
        <div
          style=${styleMap({
            flex: blockLayout.firstSlotRelativeSize * 100 + "%",
            display: 'flex'
          })}
        >
          ${this.renderSlot(blockLayout.slots[0])}
        </div>
        <div
          style=${styleMap({
            flex: (1 - blockLayout.firstSlotRelativeSize) * 100 + "%",
          })}
        >
          ${this.renderSlot(blockLayout.slots[1])}
        </div>
      </div>
    `;
  }

  render() {
    return html`${this.renderNode(this.blockLayout)}`;
  }
}

customElements.define(
  "block-sandbox-layout-renderer",
  BlockSandboxLayoutRenderer
);
