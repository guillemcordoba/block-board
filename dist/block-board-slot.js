import { __decorate } from "tslib";
import { css, html, LitElement, property, query, } from "lit-element";
export class BlockBoardSlot extends LitElement {
    updated(changedValues) {
        super.updated(changedValues);
        if (changedValues.has("block")) {
            this.block.render(this.shadowRoot);
        }
    }
    render() {
        return html ``;
    }
    static get styles() {
        return css `
      :host {
        display: flex;
      }
    `;
    }
}
__decorate([
    property({ type: Object })
], BlockBoardSlot.prototype, "block", void 0);
__decorate([
    query("#slot")
], BlockBoardSlot.prototype, "_slot", void 0);
//# sourceMappingURL=block-board-slot.js.map