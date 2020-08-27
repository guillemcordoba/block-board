import { LitElement, html, property, TemplateResult } from "lit-element";
import "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import { Block, BlockLayoutNode } from "./block";

export class BlockSandboxLayoutEditor extends LitElement {
  @property({ type: Array }) private availableBlocks: Array<Block> = [];
  @property({ type: Array }) private blockLayout: BlockLayoutNode = {
    direction: "horizontal",
    slots: [undefined, undefined],
  };

  renderBlockSlot(
    blockName: string | undefined,
    parentNode: BlockLayoutNode,
    slotIndex: number
  ) {
    return html`<div
      style="width: 100px; background-color: gray; height: 100px;"
      @drop=${(e: DragEvent) => {
        const blockName = e.dataTransfer?.getData("blockName");

        parentNode.slots[slotIndex] = blockName;
        this.requestUpdate();
      }}
      @dragover=${(e: DragEvent) => e.preventDefault()}
    >
      ${blockName !== undefined
        ? this.availableBlocks.find((b) => b.name === blockName)?.render()
        : html``}
    </div> `;
  }

  renderLayoutNode(blockLayout: BlockLayoutNode): TemplateResult {
    return html`
      <vaadin-split-layout .orientation=${blockLayout.direction}>
        ${blockLayout.slots.map((slot, index) => {
          if (slot === undefined || typeof slot === "string")
            return this.renderBlockSlot(slot, blockLayout, index);
          else return this.renderLayoutNode(slot);
        })}
      </vaadin-split-layout>
    `;
  }

  render() {
    return this.renderLayoutNode(this.blockLayout);
  }
}

customElements.define("block-sandbox-layout-editor", BlockSandboxLayoutEditor);
