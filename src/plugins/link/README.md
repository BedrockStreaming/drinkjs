# Plugin link

Link plugin provide components for link entity:

    - FormLink: form handler for url
    - Link: use by decorator for displaying a link in document
    - LinkTooltip: use with the tooltip plugin

Here's some code!

```javascript
// import create entity button
import createInlineToolbarPlugin, {
  ...,
  createEntityButton,
} from '../src/plugins/inline-toolbar';
// import link plugin with the FormLink
import createLinkPlugin, { linkStrategy, LINK, FormLink } from '../src/plugins/link';
// import helper for checking if selection contains a link entity
import selectionContainsEntity from '../src/utils/selectionContainsEntity';
// import link icon
import LinkIcon from '../src/icons/LinkIcon';

// create LINK entity button and define when button is active
const LinkButton = createEntityButton({
  entityType: LINK,
  isActive: selectionContainsEntity(linkStrategy),
  children: <LinkIcon />,
});

// add link button to inline toolbar and define is renderer
const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    ...,
    LinkButton,
    ...,
  ],
  renderers: {
    [LINK]: FormLink
  }
});
```
