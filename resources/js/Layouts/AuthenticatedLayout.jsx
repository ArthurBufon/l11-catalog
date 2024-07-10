import { Link } from '@inertiajs/react';
import { MdCategory, MdDashboard, MdEditDocument, MdLogout, MdOutlineShoppingBag, MdPeople } from "react-icons/md";
import { useState, useRef, useEffect } from 'react';

export default function Authenticated({ user, header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            
            <button
                onClick={toggleSidebar}
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside
                ref={sidebarRef}
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform shadow-md bg-gray-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
                aria-label="Sidebar">
                <div className="h-full px-4 py-4 overflow-y-auto bg-gray-50">
                    <ul className="space-y-2 font-medium text-gray-700">
                        <li>
                            <Link
                                href={route('dashboard')}
                                className={`${route().current('dashboard') ? 'bg-gray-200' : ''} flex items-center p-2 rounded-lg group`}>
                                <MdDashboard size={20} className="mr-2" />
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('products.index')} className={`${route().current('products.*') ? 'bg-gray-200' : ''} flex items-center p-2 rounded-lg group`}>
                                <MdOutlineShoppingBag size={20} className="mr-2" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`${route().current('categories.*') ? 'bg-gray-200' : ''} flex items-center p-2 rounded-lg group`}>
                                <MdCategory size={20} className="mr-2" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Categories</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className={`${route().current('users.*') ? 'bg-gray-200' : ''} flex items-center p-2 rounded-lg group`}>
                                <MdPeople size={20} className="mr-2" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('profile.edit')}
                                className={`${route().current('profile.*') ? 'bg-gray-200' : ''} flex items-center p-2 rounded-lg group`}>
                                <MdEditDocument size={20} className="mr-2" />
                                <span className="flex-1 ms-3 whitespace-nowrap">My Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link method="post" href={route('logout')} className="flex items-center p-2 rounded-lg group">
                                <MdLogout size={20} className="mr-2" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <main>{children}</main>
        </div>
    );
}
