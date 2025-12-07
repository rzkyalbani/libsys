export function Badge({ children, variant = 'neutral', className = '', ...props }) {
    const variantClasses = {
        success: 'badge-success',
        warning: 'badge-warning',
        danger: 'badge-danger',
        info: 'badge-info',
        neutral: 'badge-neutral',
    };

    return (
        <span
            className={`badge ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </span>
    );
}