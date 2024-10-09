"use client"

import { useState, useEffect, useRef } from 'react';
import React, { useContext } from "react";
import { UserContext } from "@/context/userContext";
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null); 
  const { isLogged, user, logOut } = useContext(UserContext);
  const { data:session } = useSession() 

  const handleLogout = () => {
    logOut();
    signOut();
  };
  const handleAdmin = () => {
    router.push('/admin-dashboard')
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Ayúdanos a Crecer', href: '/donations' },
    { name: 'Destinos', href: '/destinations' },
    { name: 'Blog', href: '/blog' },
    { name: 'Servicios a Empresas', href: '/business-services' },
    { name: 'Academia', href: '/academy' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {  
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-sivoy-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src="https://res.cloudinary.com/dvxh2vynm/image/upload/v1728307822/si-voy/uy3ojsyrrlildxkxhwc9.png" 
                alt="Logo de Sí, Voy" 
                width={110} 
                height={62} />
            </Link>
          </div>
          <div className="hidden md-lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-md hover:text-gray-200 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md-lg:block">
            {isLogged || session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-8 w-8 rounded-full custom-button hover:bg-sivoy-blue">
                    <Image
                      src={user?.credential?.avatar?.url|| session?.user?.image || ''} 
                      alt="Avatar del usuario"
                      className="rounded-full mt-2"
                      width={46}
                      height={46}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className='bg-white mr-2'>
                  <DropdownMenuItem>
                    <Link href="/user-dashboard">Mi Perfil</Link>
                  </DropdownMenuItem>

                  {user?.role==="admin" ? <DropdownMenuItem onClick={handleAdmin}>
                    Administrador
                  </DropdownMenuItem>: null}

                  <DropdownMenuItem onClick={handleLogout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button className="border border-white px-4 py-2 text-white rounded-md bg-sivoy-blue hover:bg-white hover:text-sivoy-blue transition-all duration-200 font-arialroundedmtbold" onClick={() => router.push('/login')}>
                  Ingresar
                </Button>
                <Button className="border bg-sivoy-blue border-white px-4 py-2 text-white rounded-md hover:bg-white hover:text-sivoy-blue transition-all duration-200 font-arialroundedmtbold" onClick={() => router.push('/register')}>
                  Registro
                </Button>
              </div>
            )}
          </div>
          <div className="md-lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#172a46] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div ref={menuRef} className="md-lg:hidden">
          <div className="px-2 pt-2 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[#172a46]">
            {isLogged ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Image
                    src={user?.credential?.avatar.url || session?.user?.image || ""} 
                    alt="Avatar del Usuario"
                    className="rounded-full"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user?.name || session?.user?.name || "Usuario"}</div> 
                  <div className="text-sm font-medium text-gray-400">{user?.credential?.email || session?.user?.email || "usuario@ejemplo.com"}</div> 
                </div>
              </div>
            ) : (
              <div className="space-y-6 mb-6">
                <Button
                  className="min-w-min ml-5 border border-white px-4 py-2 text-white rounded-md bg-sivoy-blue hover:bg-white hover:text-sivoy-blue transition-all duration-200"
                  onClick={() => router.push('/login')}
                >
                  Ingresar
                </Button>
                <Button
                  className="min-w-min ml-5 border bg-sivoy-blue border-white px-4 py-2 text-white rounded-md hover:bg-white hover:text-sivoy-blue transition-all duration-200"
                  onClick={() => router.push('/register')}
                >
                  Registro
                </Button>
              </div>
            )}
            {isLogged && (
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/user-dashboard"
                  className="block px-3 py-2 rounded-md text-base"
                  onClick={toggleMenu}
                >
                  Mi Perfil
                </Link>
                
                {user?.role === "admin" ?<Link
                  href="/admin-dashboard"
                  className="block px-3 py-2 rounded-md text-base"
                  onClick={() => {
                    handleAdmin();
                    toggleMenu()
                 
                  }}
                > 
                  Administracion
                </Link> : null}
                <button
                  className="block w-32 ml-2 text-left px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}