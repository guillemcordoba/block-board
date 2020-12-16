export interface Block {
    name: string;
    render: (registry: CustomElementRegistry, root: ShadowRoot) => void;
}
export interface BlockLayoutNode {
    direction: "vertical" | "horizontal";
    slots: [BlockSlot, BlockSlot];
    firstSlotRelativeSize: number;
}
export declare type BlockSlot = string | undefined | BlockLayoutNode;
