"use client"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Destinos', href: 'destinations' },
  { name: 'Servicios a Empresas', href: 'business-services' },
  { name: 'Blog', href: 'blog'},
  { name: 'Academia', href: 'academy'},
  

]
const paths = {
  login:'/login',
  register:'/register',
};



 const Navbar: React.FC = () => {
const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-sivoy-blue text-white  font-dinroundpro">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">

            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </a>
                  
                ))}

                <div className='ml-10 flex space-x-4'>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-small  p-1 rounded-md text-sm"
                        onClick={()=> router.push(paths.login)}
                >Ingresar
                </button>
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-small  p-1 rounded-md text-sm"
                        onClick={()=> router.push(paths.register)}
                >Registro
                </button>
                </div>
              </div>
              
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
           

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-dark text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-white data-[focus]:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar;
