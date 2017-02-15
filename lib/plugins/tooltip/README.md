# Plugin tooltip

Tooltip plugin works only with entity type and compatible plugin, it allow to wrap an inline element with tooltip functionnaly (onEnter and onLeave).

For wrapping a component with tooltip, you need to use the tooltip enhancer and add a custom renderer to the tooltip plugin for the desired entity type:

Here's some code!

```javascript
// get the tooltip enhancer
import createTooltipPlugin, { tooltipEnhancer } from '../src/plugins/tooltip';
// import link plugin with the LinkTooltip
import createLinkPlugin, { LINK, LinkTooltip } from '../src/plugins/link';

// link plugin is compatible and have an enhancer property
const linkPlugin = createLinkPlugin({ enhancer: tooltipEnhancer });

// define the custom renderer for LINK entity type
const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: {
      component: LinkTooltip
    }
  }
});
```

#### Text renderer

```javascript
// define a text renderer for the LINK entity type
const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: {
      text: "My tooltip text to display"
    }
  }
});
```

#### Callback renderer

Callback receive data from entity as parameter

```javascript
// define a callback renderer for the LINK entity type
const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: {
      getText: data => {
        return data.title
      }
    }
  }
});
```

#### Component renderer

```javascript
// define a component renderer for the LINK entity type
const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: {
      component: LinkTooltip
    }
  }
});
```