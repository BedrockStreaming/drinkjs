import React, { Component } from 'react';
import parse5 from 'parse5';
import flatten from 'lodash.flatten';

import styles from './Html.css';

function loadScript(src) {
    var script = document.createElement('script');
    script.src = src;

    document.body.appendChild(script);
}

const findScripts = (node) => {
  if (node.tagName && node.tagName === 'script') {
    return node.attrs.reduce(
      (prev, curr) => (curr.name === 'src' ? curr.value : prev),
      null
    );
  }

  return flatten((node.childNodes || []).map(findScripts));
};

export default
class Html extends Component {
  constructor(props) {
    super(props);

    this.scripts = findScripts(parse5.parseFragment(props.blockProps.html));
  }

  componentDidMount() {
    this.scripts.forEach(script => loadScript(script));
  }

  render() {
    const { blockProps: { html } } = this.props;

    return (
      <div className={styles.html} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}
