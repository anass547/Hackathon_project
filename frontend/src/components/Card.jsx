import React from 'react'

export default function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`bg-white rounded-3xl shadow-soft-arabesque p-6 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}
