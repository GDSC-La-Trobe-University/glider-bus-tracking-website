import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch, faMap, faCog } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

export function NavItem({ icon, text, to, isActive }) {
    return (
        <Link to={to}>
            <div className={`text-center ${isActive ? 'text-white' : ''}`}>
                <FontAwesomeIcon icon={icon} className='w-[16px]' />
                <div className='text-xs mt-1'>
                    {text}
                </div>
            </div>
        </Link>
    );
}

export function Nav() {
    const location = useLocation();
    const navItems = [
        { icon: faUser, text: 'For You', to: '/' },
        { icon: faSearch, text: 'Search', to: '/search' },
        { icon: faMap, text: 'Map', to: '/map' },
        { icon: faCog, text: 'Settings', to: '/settings' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 w-full flex justify-between bg-[#242424] text-gray-400 text-xl px-6 py-2 z-50">
            {navItems.map((item, index) => (
                <NavItem
                    key={index}
                    icon={item.icon}
                    text={item.text}
                    to={item.to}
                    isActive={location.pathname === item.to}
                />
            ))}
        </nav>
    );
}
