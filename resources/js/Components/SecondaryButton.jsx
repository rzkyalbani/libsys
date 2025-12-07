export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    size = 'md',
    ...props
}) {
    const sizeClasses = {
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
    };

    return (
        <button
            {...props}
            type={type}
            className={`btn btn-outline ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
