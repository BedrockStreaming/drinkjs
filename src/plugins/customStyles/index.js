import { CUSTOM_BLOCK_STYLES,CUSTOM_TEXT_STYLES } from './constants';
import Immutable from 'immutable';
import styles from './customStyles.css';

const createCustomStylesPlugin = () => {

    const blockRenderMap = Immutable.Map(CUSTOM_BLOCK_STYLES);
    const customStyleMap = CUSTOM_TEXT_STYLES;

    const blockStyleFn = (contentBlock) => {
        let style = [];

        const type = contentBlock.getType();
        for(var key in CUSTOM_BLOCK_STYLES) {
            if(CUSTOM_BLOCK_STYLES.hasOwnProperty(key)) {
              if(type === key)
                style.push(styles[key]);
            }
        }
        
        if(style !== [])
          return style;
    };

    return {
      blockStyleFn: blockStyleFn,
      blockRenderMap: blockRenderMap,
      customStyleMap:customStyleMap,
    };
};

export default createCustomStylesPlugin;