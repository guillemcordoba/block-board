import { LitElement, html, property, TemplateResult } from "lit-element";
import "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import "@material/mwc-icon-button";

import { Block, BlockLayoutNode } from "./block";
import { sharedStyles } from "./sharedStyles";

export class BlockSandboxLayoutEditor extends LitElement {
  static styles = sharedStyles;

  @property({ type: Array }) private availableBlocks: Array<Block> = [];
  @property({ type: Array }) blockLayout: BlockLayoutNode = {
    direction: "horizontal",
    slots: [undefined, undefined],
  };

  renderBlockSlot(
    blockName: string | undefined,
    parentNode: BlockLayoutNode,
    slotIndex: number
  ) {
    return html`
      <div class="column">
        <div class="row" style="justify-content: flex-end;">
          <mwc-icon-button
            @click=${() => {
              parentNode.slots[slotIndex] = {
                direction: "vertical",
                slots: [blockName, undefined],
              };
              this.requestUpdate();
            }}
            icon="horizontal_split"
          ></mwc-icon-button>
          <mwc-icon-button
            @click=${() => {
              parentNode.slots[slotIndex] = {
                direction: "horizontal",
                slots: [blockName, undefined],
              };
              this.requestUpdate();
            }}
            icon="vertical_split"
          ></mwc-icon-button>
        </div>
        <div
          style="background-color: gray; flex: 1;"
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
        </div>
      </div>
    `;
  }

  renderLayoutNode(blockLayout: BlockLayoutNode): TemplateResult {
    return html`
      <vaadin-split-layout
        .orientation=${blockLayout.direction}
        style="flex: 1;"
      >
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
