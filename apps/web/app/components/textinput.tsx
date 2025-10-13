
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TextInput = (props: TextInputProps) => {
    return <input type='text' {...props} className={"bg-neutral-100 px-3 py-2 rounded-full grow" + (props.className ?? "")}>
        {props.children}
    </input>;
}

export default TextInput;
