import { TemplateResult } from "lit-html";

export interface Block {
  name: string;

  render: () => TemplateResult;
}

export interface BlockLayoutNode {
  direction: "vertical" | "horizontal";
  slots: [BlockSlot, BlockSlot]; // if it's a string, it's the block name, if it's undefined, a void block slot
  firstSlotRelativeSize: number;
}

export type BlockSlot = string | undefined | BlockLayoutNode;
