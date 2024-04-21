import Block from "../../utils/Block";

class InputElement extends Block {
    constructor(props: Record<string, unknown>) {
        super('div', props)
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="input {{#if error}}input__error{{/if}}" >
            <label class="input__container">
                {{{ Input }}}
                <div class="input__label">{{label}}</div>
            </label>
            {{{ ErrorLine }}}
        </div>
    `
    }
}

export default InputElement;
