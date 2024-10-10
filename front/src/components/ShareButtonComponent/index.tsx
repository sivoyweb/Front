"use client";

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const ShareComponent = () => {
    const pathname = usePathname(); // Obtiene la ruta actual
    const searchParams = useSearchParams(); // Obtiene los parámetros de búsqueda
    const [currentUrl, setCurrentUrl] = useState(''); // Estado para almacenar la URL completa
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Obtener el host actual y construir la URL completa
            const baseUrl = window.location.origin;
            const fullUrl = `${baseUrl}${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`;
            setCurrentUrl(fullUrl);
        }
    }, [pathname, searchParams]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // URLs de compartir en redes sociales con el mismo mensaje para Facebook y Twitter
    const shareMessage = "¡Mira este destino increíble!";
    const facebookShare = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareMessage)}`;
    const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareMessage)}`;

    return (
        <div className="flex justify-start bg-white mt-2">
            <div className="flex flex-wrap items-left">
                <div className="relative">
                    <button
                        className="sharebtn relative flex z-10 bg-white border rounded-md p-2 focus:outline-none focus:bg-blue-100 hover:bg-blue-100"
                        title="click to enable menu"
                        onClick={toggleDropdown}
                    >
                        <span className="inline-block pr-4 text-gray-600">Compartir</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="h-5 w-6 my-1 text-sivoy-blue"
                        >
                            <path
                                fill="currentColor"
                                d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
                            />
                        </svg>
                    </button>
                    <div
                        className={`sharebtn-dropdown absolute left-0 mt-0 w-48 bg-white rounded-sm overflow-hidden shadow-lg z-20 border border-gray-100 ${
                            isDropdownOpen ? '' : 'hidden'
                        }`}
                    >
                        <a
                            href={facebookShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Share on Facebook"
                            className="flex px-4 py-2 text-sm text-gray-800 border-b hover:bg-blue-100"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="facebook-messenger"
                                className="w-5 h-5 mr-4 text-blue-500"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 0 0 122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 0 1-53.91 9.93l-58.08-43.47a15 15 0 0 0-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0 1 53.91-9.93l58.06 43.46a15 15 0 0 0 18 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
                                />
                            </svg>
                            <span className="text-gray-600">Facebook</span>
                        </a>
                        <a
                            href={twitterShare}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Share on Twitter"
                            className="flex px-4 py-2 text-sm text-gray-800 border-b hover:bg-blue-100"
                        >
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="twitter-square"
                                className="w-5 h-5 mr-4 text-blue-500"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"
                                />
                            </svg>
                            <span className="text-gray-600">Twitter</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareComponent;
