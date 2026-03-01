import React from 'react'

export default function Button({ variant = 'primary', size = 'md', children, onClick, className = '', ...props }) {
    const baseStyle = "inline-flex items-center justify-center font-semibold transition-all duration-200 transform active:scale-95 hover:opacity-90"

    // Size styles
    const sizeStyles = {
        sm: "px-4 py-2 text-sm rounded-full",
        md: "px-6 py-3 text-base rounded-2xl",
        lg: "px-8 py-4 text-lg rounded-2xl"
    }

    // Variant styles
    const variantStyles = {
        primary: "bg-terracotta text-white shadow-md hover:shadow-lg",
        success: "bg-zellige text-white shadow-md hover:shadow-lg",
        outline: "border-2 border-terracotta text-terracotta bg-transparent hover:bg-terracotta/5",
        ghost: "text-medina-dark hover:bg-medina-muted/10",
    }

    return (
        <button
            onClick={onClick}
            className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
