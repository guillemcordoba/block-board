export interface Block {
  name: string;

  render: (registry: CustomElementRegistry, root: ShadowRoot) => void;
}

export interface BlockLayoutNode {
  direction: "vertical" | "horizontal";
  slots: [BlockSlot, BlockSlot]; // if it's a string, it's the block name, if it's undefined, a void block slot
  firstSlotRelativeSize: number;
}

export type BlockSlot = string | undefined | BlockLayoutNode;
