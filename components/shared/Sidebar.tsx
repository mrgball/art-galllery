'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import clsx from 'clsx';



const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/categories', label: 'Kategori' },
    { href: '/dashboard/logout', label: 'Logout' },
  ];

  return (
    <div
      id="sidebar"
      className="w-64 h-screen bg-gray-900 text-white flex flex-col px-6 py-8 shadow-lg"
    >
      <Link href={'/dashboard'} className="text-2xl font-bold mb-4 cursor-pointer hover:cursor-pointer">Art Gallery</Link>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'px-4 py-2 rounded-md transition-colors cursor-pointer',
                (isActive)
                  ? 'bg-gray-700 font-semibold'
                  : 'hover:bg-gray-800 text-gray-300'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
