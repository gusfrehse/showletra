'use client';

import { useState, useEffect, useRef } from 'react';

let addStatusHandler: ((style: string, message: string) => void) | null = null;

export const Status = {
    show(style: string, message: string) {
        addStatusHandler?.(style, message)
    }
}

export function StatusContainer() {
    const [info, setInfo] = useState<{style: string, message: string}>({
        style: "red",
        message: ""
    });
    const timeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        addStatusHandler = (style: string, message: string) => {
            if (timeout.current)
                clearTimeout(timeout.current);

            setInfo({ message, style });

            timeout.current = setTimeout(() => {
                setInfo({ message: "", style: "" });
            }, 5000);
        }

        return () => {
            addStatusHandler = null;
        }
    }, []);

    return <p className={`${info.style}`}>{info.message}</p>
}
