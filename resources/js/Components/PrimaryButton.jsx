export default function PrimaryButton({
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
            className={`btn btn-primary ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
