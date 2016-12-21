import createStore from './utils/createStore';
import decorateComponentWithProps from 'decorate-component-with-props';
import TooltipContainer from './components/TooltipContainer';
import { default as defaultTooltipEnhancer } from './utils/tooltipEnhancer';

const store = createStore({
  data: null
});

// define a tooltip enhancer who wrap en element with enter/leave functionnality
const tooltipEnhancer = ComponentToWrap => decorateComponentWithProps(defaultTooltipEnhancer(ComponentToWrap), {
  store
});

const createTooltipPlugin = ({ renderers }) => {
  const customProps = {
    store,
    renderers
  };

  return {
    TooltipContainer: decorateComponentWithProps(TooltipContainer, customProps),
  };
};

export default createTooltipPlugin;

export {
  tooltipEnhancer
}
