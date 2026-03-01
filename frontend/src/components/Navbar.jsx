import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const { user } = useAuth()

    return (
        <nav className="sticky top-0 z-50 w-full bg-tadelakt/80 backdrop-blur-md border-b border-medina-muted/20 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <img
                            src="/image_12.png"
                            alt="Logo L'm3ALEM"
                            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* User Placeholder / Action */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shadow-soft-arabesque cursor-pointer hover:bg-terracotta/90 transition-colors">
                                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth" className="text-sm font-semibold text-terracotta hover:text-zellige transition-colors duration-200">
                                Se Connecter
                            </Link>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    )
}
