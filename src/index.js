import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './Editor';

const Drinkjs = {};

Drinkjs.Editor = function (element) {
  ReactDOM.render(<Editor />, element);
};

window.Drinkjs = Drinkjs;
