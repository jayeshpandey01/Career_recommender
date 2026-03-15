import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const { currentUser, logout } = useAuth()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close drawer on route change
    useEffect(() => { setOpen(false) }, [pathname])

    const links = [
        { to: '/', label: 'Home', icon: 'fa-solid fa-house' },
        { to: '/predict', label: 'Career Predict', icon: 'fa-solid fa-brain' },
        { to: '/roadmap', label: 'Roadmap', icon: 'fa-solid fa-map' },
    ]

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-inner">
                {/* Logo */}
                <Link to="/" className="nav-logo">
                    <div className="logo-box">Z</div>
                    <span>CareerAI</span>
                </Link>

                {/* Desktop links */}
                <div className="nav-links">
                    {links.map(l => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className={`nav-link ${pathname === l.to ? 'active' : ''}`}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link to="/about" className="nav-link">About us</Link>
                    <Link to="/reviews" className="nav-link">Reviews</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                </div>

                {/* Desktop CTAs */}
                <div className="nav-ctas">
                    {currentUser ? (
                        <div className="nav-profile" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span className="nav-user-name" title={currentUser.email || ''} style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                {currentUser.displayName?.split(' ')[0] || 'Student'}
                            </span>
                            <button className="btn btn-outline" onClick={logout}>
                                Log out
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-black-pill">
                            Sign in
                        </Link>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="nav-hamburger"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
                </button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="nav-drawer">
                    {links.map(l => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className={`drawer-link ${pathname === l.to ? 'active' : ''}`}
                        >
                            <i className={l.icon}></i>
                            {l.label}
                        </Link>
                    ))}
                    <div className="drawer-ctas">
                        {currentUser ? (
                            <>
                                <Link to="/predict" className="btn btn-outline btn-full">
                                    <i className="fa-solid fa-brain"></i> Predict Career
                                </Link>
                                <button className="btn btn-primary btn-full" onClick={logout} style={{ marginTop: '12px' }}>
                                    Log out
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-primary btn-full">
                                Sign in to access tools
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}
