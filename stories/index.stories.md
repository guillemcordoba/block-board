```js script
import { html } from '@open-wc/demoing-storybook';
import '../dist/block-sandbox.js';

export default {
  title: 'BlockSandbox',
  component: 'block-sandbox',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# BlockSandbox

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add block-sandbox
```

```js
import 'block-sandbox/block-sandbox.js';
```

```js preview-story
export const Simple = () => html`
  <block-sandbox></block-sandbox>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <block-sandbox title="Hello World"></block-sandbox>
`;
```
