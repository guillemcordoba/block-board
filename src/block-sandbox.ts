import { html, css, LitElement, property } from "lit-element";
import { Block, BlockLayoutNode } from "./block";
import "./block-sandbox-block-selector";
import "./block-sandbox-layout-editor";
import "./block-sandbox-layout-renderer";
import "@material/mwc-drawer";
import "@material/mwc-icon-button";
import { sharedStyles } from "./sharedStyles";
import { BlockSandboxLayoutEditor } from "./block-sandbox-layout-editor";

export class BlockSandbox extends LitElement {
  @property({ type: Boolean }) private editing: boolean = true;
  @property({ type: Array }) private availableBlocks: Array<Block> = [
    {
      name: "block1",
      render: () => html`<p>ahaaa</p>`,
    },

    {
      name: "block2",
      render: () => html`<h1>ñasdljfñlasdjfñlsakdf</h1>`,
    },

    {
      name: "block3",
      render: () =>
        html`<ul>
          <li>Item1</li>
          <li>Item2</li>
        </ul>`,
    },
  ];

  @property({ type: Array }) savedBlockLayout:
    | BlockLayoutNode
    | undefined = undefined;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
      }
    `,
  ];

  saveLayout() {
    const editor: BlockSandboxLayoutEditor = this.shadowRoot?.getElementById(
      "layout-editor"
    ) as BlockSandboxLayoutEditor;

    this.savedBlockLayout = editor.blockLayout;

    this.editing = false;
  }

  renderLayout() {
    return html`
      <block-sandbox-layout-renderer
        style="flex: 1;"
        .blockLayout=${this.savedBlockLayout}
        .availableBlocks=${this.availableBlocks}
      ></block-sandbox-layout-renderer>
    `;
  }

  renderEditingMode() {
    return html`
      <mwc-drawer style="flex: 1;">
        <div class="column">
          <div class="row" style="justify-content: flex-end;">
            <mwc-icon-button
              icon="save"
              @click=${this.saveLayout}
            ></mwc-icon-button>
          </div>
          <block-sandbox-block-selector
            .availableBlocks=${this.availableBlocks}
          ></block-sandbox-block-selector>
        </div>

        <div slot="appContent" class="column" style="height: 100%;">
          <block-sandbox-layout-editor
            id="layout-editor"
            style="flex: 1;"
            class="column"
            .availableBlocks=${this.availableBlocks}
          ></block-sandbox-layout-editor>
        </div>
      </mwc-drawer>
    `;
  }

  render() {
    if (this.editing) return this.renderEditingMode();
    else return this.renderLayout();
  }
}
