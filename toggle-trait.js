import { XtalDecor, define } from 'xtal-decor/xtal-decor.js';
const init = ({ self }) => {
    let buttonEl = self;
    self.dataset.pressed = 'false';
};
const clickHandler = ({ self }) => {
    // const currVal = self.getAttribute(ap);
    // self.setAttribute(ap, currVal === 'true' ? 'false' : 'true');
    self.dataset.pressed = self.dataset.pressed === 'false' ? 'true' : 'false';
    let button = self;
    if (self.localName !== 'button' && self.shadowRoot !== null) {
        const clickedButton = self.shadowRoot.activeElement;
        if (clickedButton !== null)
            button = clickedButton;
    }
    if (button.localName === 'button') {
        button.setAttribute('aria-pressed', self.dataset.pressed);
    }
};
const on = {
    click: clickHandler
};
export class ToggleTrait extends XtalDecor {
    // static attributeProps: any = ({buttonIsInShadowRoot}: ToggleTrait) => {
    //     const ap = {
    //         bool: [buttonIsInShadowRoot]
    //     } as AttributeProps;
    //     return mergeProps(ap, XtalDecor.props);
    // };
    constructor() {
        super();
        this.init = init;
        this.on = on;
        this.actions = [];
        if (this.upgrade === undefined)
            this.upgrade = 'button';
    }
}
ToggleTrait.is = 'toggle-trait';
define(ToggleTrait);
