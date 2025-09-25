
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = (props: ButtonProps) => {
    return <button {...props} className={"bg-black-200" + (props.className ?? "")}>
        {props.children}
    </button>;
}

export default Button;
