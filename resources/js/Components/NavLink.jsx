import { Link } from "@inertiajs/react";

export default function NavLink({ href, active, children, className = '', ...props }) {
    return (
        <Link
            href={href}
            {...props}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            } ${className}`}
        >
            {children}
        </Link>
    );
}
