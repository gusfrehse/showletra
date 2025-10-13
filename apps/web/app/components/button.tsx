
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button = (props: ButtonProps) => {
    return <button {...props} className={"bg-black text-white text-2xl text-center font-bold w-12 aspect-square rounded-full" + (props.className ?? "")}>
        {props.children}
    </button>;
}

export default Button;
