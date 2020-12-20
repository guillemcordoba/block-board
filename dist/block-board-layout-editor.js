import { __decorate } from "tslib";
import { LitElement, html, property, } from "lit-element";
import { SplitLayoutElement } from "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import { sharedStyles } from "./sharedStyles";
import { ScopedElementsMixin as Scoped } from "@open-wc/scoped-elements";
import { IconButton } from "scoped-material-components/mwc-icon-button";
import { CircularProgress } from "scoped-material-components/mwc-circular-progress";
import { BlockBoardSlot } from "./block-board-slot";
export class BlockBoardLayoutEditor extends Scoped(LitElement) {
    constructor() {
        super(...arguments);
        this.availableBlocks = [];
    }
    static get scopedElements() {
        return {
            "block-board-slot": BlockBoardSlot,
            "vaadin-split-layout": SplitLayoutElement,
            "mwc-icon-button": IconButton,
            "mwc-circular-progress": CircularProgress,
        };
    }
    firstUpdated() {
        if (this.blockLayout === undefined) {
            this.blockLayout = {
                direction: "horizontal",
                slots: [undefined, undefined],
                firstSlotRelativeSize: 0.5,
            };
        }
    }
    renderBlockSlot(blockName, parentNode, slotIndex) {
        return html `
      <div class="column">
        <div class="row" style="justify-content: flex-end;">
          <mwc-icon-button
            @click=${() => {
            parentNode.slots[slotIndex] = {
                direction: "vertical",
                firstSlotRelativeSize: 0.5,
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
                firstSlotRelativeSize: 0.5,
                slots: [blockName, undefined],
            };
            this.requestUpdate();
        }}
            icon="vertical_split"
          ></mwc-icon-button>
          <mwc-icon-button
            @click=${() => {
            parentNode.slots.splice(slotIndex, 1);
            this.requestUpdate();
        }}
            icon="delete"
          ></mwc-icon-button>
        </div>
        <div
          style="background-color: rgba(0, 0, 0, 0.1); flex: 1;"
          @drop=${(e) => {
            var _a;
            const blockName = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("blockName");
            parentNode.slots[slotIndex] = blockName;
            this.requestUpdate();
        }}
          @dragover=${(e) => e.preventDefault()}
        >
          ${blockName && this.findBlock(blockName)
            ? html `<block-board-slot
                style="pointer-events: none;"
                .block=${this.findBlock(blockName)}
              ></block-board-slot>`
            : html ``}
        </div>
      </div>
    `;
    }
    findBlock(blockName) {
        return this.availableBlocks.find((b) => b.name === blockName);
    }
    renderLayoutNode(blockLayout) {
        return html `
      <vaadin-split-layout
        .orientation=${blockLayout.direction}
        style="flex: 1;"
        @splitter-dragend=${(e) => {
            const getPxSize = (slotElement) => parseInt(slotElement
                .assignedNodes()[0]
                .style.flex.split(" ")[2]
                .split("px")[0]);
            const primaryPxSize = getPxSize(e.path[0].$.primary);
            const secondaryPxSize = getPxSize(e.path[0].$.secondary);
            blockLayout.firstSlotRelativeSize =
                primaryPxSize / (primaryPxSize + secondaryPxSize);
        }}
      >
        ${blockLayout.slots.map((slot, index) => {
            if (!slot || typeof slot === "string")
                return this.renderBlockSlot(slot, blockLayout, index);
            else
                return this.renderLayoutNode(slot);
        })}
      </vaadin-split-layout>
    `;
    }
    render() {
        if (!this.blockLayout)
            return html `<mwc-circular-progress></mwc-circular-progress>`;
        return this.renderLayoutNode(this.blockLayout);
    }
}
BlockBoardLayoutEditor.styles = sharedStyles;
__decorate([
    property({ type: Array })
], BlockBoardLayoutEditor.prototype, "availableBlocks", void 0);
__decorate([
    property({ type: Object })
], BlockBoardLayoutEditor.prototype, "blockLayout", void 0);
//# sourceMappingURL=block-board-layout-editor.js.map