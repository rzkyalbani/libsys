import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, error = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const baseClasses = 'input-field';
    const errorClasses = error ? 'input-field-error' : '';

    return (
        <input
            {...props}
            type={type}
            className={`${baseClasses} ${errorClasses} ${className}`}
            ref={localRef}
        />
    );
});
