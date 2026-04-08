import { navbarStyles } from '../assets/dummyStyles'
import { BaggageClaim, Clock, Menu, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'

const navItems = [
  {name: "Home", href: "/"},
  {name: "Watches", href: "/watches"},
  {name: "Contact", href: "/contact"},
]

const Navbar = () => {

  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [active, setActive] = useState(location.pathname || '/')

  const {totalItems} = useCart()
  const [loggegIn, setLoggedIn] = useState(() => {

    try {
      return(
      localStorage.getItem('isLoggedIn') === "true" || !!localStorage.getItem('authToken'))
    } catch {
      return false
    }
  })

  useEffect(() => {
    setActive(location.pathname || '/')
  }, [location])

  //keep user logged-in for all pages
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "isLoggedIn" || e.key === "authToken") {
        try {
          const isNowLoggedIn =
            localStorage.getItem("isLoggedIn") === "true" ||
            !!localStorage.getItem("authToken");
          setLoggedIn(isNowLoggedIn);
        } catch {
          setLoggedIn(false);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleNavClick = (href) => {
    setActive(href)
    setOpen(false)
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('authToken')
    } catch (e) {}
      setLoggedIn(false)
      setOpen(false)
      navigate('/')
    
  }

  return (
    <header className={navbarStyles.header} >
      <nav className={navbarStyles.nav} role='navigation'>
        <div className={navbarStyles.container}>
          {/* Logo */}
          <div className={navbarStyles.brandContainer}>
            <div className={navbarStyles.logoContainer}>
              <Clock className={navbarStyles.logoIcon} />
            </div>

            <Link to='/' onClick={() => handleNavClick('/')} className={navbarStyles.logoLink}>
              <span style={navbarStyles.logoTextStyle} className={navbarStyles.logoText}>
                ChronoElite
              </span>
            </Link>
          </div>

          {/* Desktop */}
          <div className={navbarStyles.desktopNav}>
            {navItems.map((val) => {
              const isActive = active === val.href

              return(
                <Link key={val.name} to={val.href} onClick={() => handleNavClick(val.href)} className={`${navbarStyles.navItemBase} ${isActive ? navbarStyles.navItemActive : navbarStyles.navItemInactive}`}>
                  <span>{val.name}</span>
                  <span className={`${navbarStyles.activeIndicator} ${isActive ? navbarStyles.activeIndicatorVisible : navbarStyles.activeIndicatorHidden}`}>

                  </span>
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className={navbarStyles.rightActions}>
            <Link to='/cart' className={navbarStyles.cartLink}>
              <BaggageClaim className={navbarStyles.cartIcon} />

              {totalItems > 0 && (
                <span className={navbarStyles.cartBadge}>
                  {totalItems}
                </span>
              )}
            </Link>

            {!loggegIn ? (
              <Link to='/login' className={navbarStyles.accountLink}>
                <User className={navbarStyles.accountIcon} />
                <span className={navbarStyles.accountText}>
                  Account
                </span>
              </Link>
            ) : (
              <button onClick={handleLogout} className={navbarStyles.accountLink}>
                <User className={navbarStyles.accountIcon} />
                <span className={navbarStyles.accountText}>
                  Logout
                </span>
              </button>
            )}

            {/* Mobile toggle */}
            <div className={navbarStyles.mobileMenuButton}>
              <button onClick={() => setOpen(!open)} className={navbarStyles.menuButton}>
                {open ? (<X className={navbarStyles.menuIcon} />) :
                (<Menu className={navbarStyles.menuIcon} />)}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigations */}
        {open && (
          <div className={navbarStyles.mobileMenu}>
            <div className={navbarStyles.mobileMenuContainer}>
              {navItems.map(val => {
                const isActive = active === val.href

                return(
                  <Link key={val.name} to={val.href} onClick={() => handleNavClick(val.href)} className={`${navbarStyles.mobileNavItemBase} ${
                    isActive ? navbarStyles.mobileNavItemActive : navbarStyles.mobileNavItemInactive
                  }`}>
                    <span className={navbarStyles.mobileNavItemText}>
                      {val.name}
                    </span>
                  </Link>
                )
              })}

              <div className={navbarStyles.mobileAccountContainer}>
                {!loggegIn ? (
                  <Link to='/login' onClick={() => {
                    setOpen(false)
                    handleNavClick('/login')
                  }} className={navbarStyles.mobileAccountLink}>
                    <User className={navbarStyles.mobileAccountIcon} />
                    <span>Account</span>
                  </Link>
                ): (
                  <button onClick={handleLogout} className={navbarStyles.mobileAccountButton}>
                    <User className={navbarStyles.mobileAccountIcon} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar