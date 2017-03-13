import { createStore } from '../../utils/createStore';
import decorateComponentWithProps from 'decorate-component-with-props';
import TooltipContainer from './components/TooltipContainer';
import { default as defaultTooltipEnhancer } from './utils/tooltipEnhancer';

const createTooltipPlugin = () => {
  const store = createStore({
    data: null
  });

  let renderers = {};

  const getRenderers = () => {
    return renderers;
  };

  const props = {
    store,
    getRenderers
  };

  // define a tooltip enhancer who wrap en element with enter/leave functionnality
  const tooltipEnhancer = ComponentToWrap => decorateComponentWithProps(defaultTooltipEnhancer(ComponentToWrap), {
    store
  });

  return {
    setRenderers: (customRenderers = {}) => {
      renderers = customRenderers;
    },
    Component: decorateComponentWithProps(TooltipContainer, props),
    tooltipEnhancer
  };
};

export default createTooltipPlugin;
