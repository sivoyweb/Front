"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import logo from "../../../public/assets/logo.png";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const navigation = [
  { name: "Destinos", href: "/destinations" },
  { name: "Servicios a Empresas", href: "/business-services" },
  { name: "Blog", href: "/blog" },
  { name: "Academia", href: "/academy" },
];

const paths = {
  login: "/login",
  register: "/register",
  home: "/",
};


const Navbar: React.FC = () => {
  const router = useRouter();
  const {isLogged} = useContext(UserContext);

  return (
          <Disclosure as="nav" className="bg-sivoy-blue text-white font-arialroundedmtbold">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                {/* Botón del menú móvil */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-sivoy-orange focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
                  </DisclosureButton>
                </div>

                {/* Logo y navegación */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex items-center">
                    <Image
                      alt="Sí, voy"
                      src={logo}
                      className="w-auto"
                      onClick={() => router.push(paths.home)}
                    />
                  </div>
                </div>

                {/* Navegación para pantallas grandes */}
                <div className="hidden sm:flex sm:items-center sm:space-x-4 ml-auto">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-sivoy-orange px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex space-x-4">
                    <button
                      className="hover:text-sivoy-orange text-white font-small p-2 rounded-md text-sm"
                      onClick={() => router.push(paths.login)}
                    >
                      Ingresar
                    </button>
                    <button
                      className="hover:text-sivoy-orange text-white font-small p-2 rounded-md text-sm"
                      onClick={() => router.push(paths.register)}
                    >
                      Registro
                    </button>
                  </div>
                </div>

                {isLogged &&
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-50">
                  <Menu as="div" className="relative ml-3">
                    <MenuButton className="relative flex rounded-full bg-dark text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Menú de Usuario
                      </span>
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <MenuItem>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700">
                          Mi Perfil
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700">
                          Configuración
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700">
                          Cerrar Sesión
                        </Link>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
                }
              </div>
            </div>

            {/* Menú móvil colapsado */}
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-sivoy-orange hover:bg-gray-700"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
              <div className="px-2 pb-3 pt-2">
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-sivoy-orange hover:bg-gray-700"
                  onClick={() => router.push(paths.login)}
                >
                  Ingresar
                </button>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:text-sivoy-orange hover:bg-gray-700"
                  onClick={() => router.push(paths.register)}
                >
                  Registro
                </button>
              </div>
            </DisclosurePanel>
          </Disclosure>
  );
};

export default Navbar;