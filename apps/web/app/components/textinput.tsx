
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
    return <input type='text' {...props} className={"bg-neutral-100" + (props.className ?? "")}>
        {props.children}
    </input>;
}

export default TextInput;
