export default function DangerButton({
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
            className={`btn btn-danger ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
