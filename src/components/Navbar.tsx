"use client";
import Link from "next/link";
import { Menu, X, Package, Truck, Home, Phone, User } from "lucide-react";
import { useState } from "react";
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
 
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const Navitems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="w-6 h-6" />,
    },
    {
      label: "Services",
      href: "/services",
      icon: <Package className="w-6 h-6" />,
    },
    {
      label: "Tracking",
      href: "/tracking",
      icon: <Truck className="w-6 h-6" />,
    },

    { label: "Contact", href: "/contact", icon: <Phone className="w-6 h-6" /> },
  ];

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-6 bg-white shadow-2xl sticky top-0 z-50">
        {/* logo */}
        <Link
          href="/"
          className="text-2xl p-2 rounded-lg text-white font-bold bg-primary"
        >
          Velox<span className="text-secondary">logistics</span>
        </Link>

        {/* desktop menu */}
        <div className="flex gap-6">
          <div className="md:flex hidden">
            {Navitems.map((items) => (
              <Link
                key={items.label}
                href={items.href}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mx-4 text-xl"
              >
                {items.icon}
                <span>{items.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="md:flex hidden space-x-5 items-center">
             {isSignedIn?(
               <div className="flex items-center space-x-3">
                {user?.publicMetadata?.role ==='admin' &&(
                     <a 
                    href="/admin"
                    className="text-xl font-medium text-primary "
                  >
                    Admin
                  </a>
                )}
                 <UserButton afterSignOutUrl="/" />
               </div>
             ):(
                <SignInButton mode="modal">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-50">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign In</span>
                </button>
              </SignInButton>
             )}
          </div>

          {/* mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* mobile menu dropdown */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {Navitems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="flex items-center gap-3 text-gray-600 hover:text-gray-800 py-2 text-lg transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
                
            {isSignedIn ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Hello, {user?.firstName}
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center justify-center space-x-2 text-gray-600 hover:text-primary py-2 transition-colors w-full">
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
