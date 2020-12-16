import { LitElement } from "lit-element";
import { Block } from "./block";
declare const BlockBoardSlot_base: typeof LitElement & import("lit-element").Constructor<import("scoped-element-mixin/dist/ScopedElementMixin").ScopedElement>;
export declare class BlockBoardSlot extends BlockBoardSlot_base {
    block: Block;
    _slot: HTMLElement;
    firstUpdated(): void;
    render(): import("lit-element").TemplateResult;
}
export {};
