import { html, fixture, expect } from "@open-wc/testing";

import { BlockSandbox } from "../src/block-sandbox";

describe("BlockSandbox", () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el: BlockSandbox = await fixture(html`
      <block-sandbox></block-sandbox>
    `);

    expect(el.title).to.equal("Hey there");
  });

  it("increases the counter on button click", async () => {
    const el: BlockSandbox = await fixture(html`
      <block-sandbox></block-sandbox>
    `);
    el.shadowRoot!.querySelector("button")!.click();

  });

  it("can override the title via attribute", async () => {
    const el: BlockSandbox = await fixture(html`
      <block-sandbox title="attribute title"></block-sandbox>
    `);

    expect(el.title).to.equal("attribute title");
  });

  it("passes the a11y audit", async () => {
    const el: BlockSandbox = await fixture(html`
      <block-sandbox></block-sandbox>
    `);

    await expect(el).shadowDom.to.be.accessible();
  });
});
