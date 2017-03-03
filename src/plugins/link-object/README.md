# Plugin link object

Link object plugin provide components for link object entity:

    - LinkObject: use by decorator for displaying a link in document
    - LinkObjectTooltip: use with the tooltip plugin

Link Object button must implement Promise and return an object formatted with type and title like

```
{
    id: 146,
    type: 'section',
    title: 'Chemises et tuniques',
    url: '/chemises-et-tuniques-femme/',
}
```

Here's some code!

```javascript
// import create entity button
import createInlineToolbarPlugin, {
  ...,
  createEntityButton,
} from '../src/plugins/inline-toolbar';
// import link object plugin
import createLinkObjectPlugin, { LinkObjectTooltip, LINK_OBJECT, LINK_OBJECT_MUTABILITY } from '../src/plugins/link-object';
// import link icon
import LinkObjectIcon from '../src/icons/LinkObjectIcon';

// create LINK entity button and define when button is active
const LinkObjectButton = createEntityButton({
  entityType: LINK_OBJECT,
  entityMutability: LINK_OBJECT_MUTABILITY,
  children: <LinkObjectIcon />,
  onClick: () => {
    // emulate modal result
    return new Promise(resolve => {
      const section = {
        id: 146,
        type: 'section',
        title: 'Chemises et tuniques',
        url: '/chemises-et-tuniques-femme/',
      };
  
      resolve(section);
    });
  }
});

// add link button to inline toolbar and define is renderer
const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    ...,
    LinkObjectButton,
    ...,
  ]
});
```
