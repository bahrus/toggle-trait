import {XtalDecor, define, SelfReferentialHTMLElement, EventSettings, PropAction, AttributeProps, mergeProps} from 'xtal-decor/xtal-decor.js';


const init = ({self}: SelfReferentialHTMLElement) => {
    let buttonEl = self;
    self.dataset.pressed = 'false';
}

const clickHandler = ({self}: SelfReferentialHTMLElement) => {
    // const currVal = self.getAttribute(ap);
    // self.setAttribute(ap, currVal === 'true' ? 'false' : 'true');
    self.dataset.pressed = self.dataset.pressed === 'false' ? 'true' : 'false';
    let button = self as HTMLButtonElement;
    if(self.localName !== 'button' && self.shadowRoot !== null){
        const clickedButton = self.shadowRoot.activeElement as HTMLButtonElement;
        if(clickedButton !== null) button = clickedButton;
    }
    if(button.localName === 'button'){
        button.setAttribute('aria-pressed', self.dataset.pressed);
    }
}

const on = {
    click: clickHandler
} as EventSettings;

export class ToggleTrait extends XtalDecor<SelfReferentialHTMLElement>{
    static is = 'toggle-trait';
    // static attributeProps: any = ({buttonIsInShadowRoot}: ToggleTrait) => {
    //     const ap = {
    //         bool: [buttonIsInShadowRoot]
    //     } as AttributeProps;
    //     return mergeProps(ap, XtalDecor.props);
    // };
    constructor(){
        super();
        if(this.upgrade === undefined) this.upgrade = 'button';
    }
    init = init;
    on = on;
    actions = [];
    //buttonIsInShadowRoot: boolean | undefined;
}
define(ToggleTrait);