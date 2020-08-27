import { html, css, LitElement, property } from "lit-element";
import { Block } from "./block";
import "./block-sandbox-block-selector";
import "./block-sandbox-layout-editor";
import "@material/mwc-drawer";
import { sharedStyles } from "./sharedStyles";

export class BlockSandbox extends LitElement {
  @property({ type: Boolean }) private editing: boolean = true;
  @property({ type: Array }) private availableBlocks: Array<Block> = [
    {
      name: "block1",
      render: () => html`<p>ahaaa</p>`,
    },
  ];

  static styles = sharedStyles;

  render() {
    return html`
      <mwc-drawer>
        <block-sandbox-block-selector
          .availableBlocks=${this.availableBlocks}
        ></block-sandbox-block-selector>
        <div slot="appContent" class="column">
          <block-sandbox-layout-editor
            style="flex: 1;"
            .availableBlocks=${this.availableBlocks}
          ></block-sandbox-layout-editor>
        </div>
      </mwc-drawer>
    `;
  }
}
