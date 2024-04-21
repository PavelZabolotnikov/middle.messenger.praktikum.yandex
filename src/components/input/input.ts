import Block from "../../utils/Block";

class Input extends Block {
    constructor(props: Record<string, unknown>) {
        super('input', props)
    }

    render(): string {
        return `
            <input
                class="input__element"
                placeholder=""
            />
        `
    }
}

export default Input;
