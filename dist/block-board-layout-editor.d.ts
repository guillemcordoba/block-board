import { LitElement, TemplateResult } from "lit-element";
import { SplitLayoutElement } from "@vaadin/vaadin-split-layout/vaadin-split-layout.js";
import { Block, BlockLayoutNode } from "./block";
import { IconButton } from "@material/mwc-icon-button";
import { BlockBoardSlot } from "./block-board-slot";
declare const BlockBoardLayoutEditor_base: typeof LitElement & import("lit-element").Constructor<HTMLElement> & {
    readonly scopedElements: import("scoped-elements").Dictionary<{
        new (): HTMLElement;
        prototype: HTMLElement;
    }>;
};
export declare class BlockBoardLayoutEditor extends BlockBoardLayoutEditor_base {
    static styles: import("lit-element").CSSResult;
    private availableBlocks;
    blockLayout: BlockLayoutNode;
    static get scopedElements(): {
        "block-board-slot": typeof BlockBoardSlot;
        "vaadin-split-layout": typeof SplitLayoutElement;
        "mwc-icon-button": typeof IconButton;
    };
    renderBlockSlot(blockName: string | undefined, parentNode: BlockLayoutNode, slotIndex: number): TemplateResult;
    findBlock(blockName: string): Block | undefined;
    renderLayoutNode(blockLayout: BlockLayoutNode): TemplateResult;
    render(): TemplateResult;
}
export {};
