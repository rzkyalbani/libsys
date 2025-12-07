import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`block w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            } ${className}`}
        >
            {children}
        </Link>
    );
}
