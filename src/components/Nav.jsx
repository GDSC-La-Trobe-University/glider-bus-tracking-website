import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch, faMap, faCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export function NavItem({ icon, text, to }) {
    return <Link to={to}>
        <div className='text-center'>
            <FontAwesomeIcon icon={icon} className='w-[18px]' />
            <div className='text-xs mt-1'>
                {text}
            </div>
        </div>
    </Link>
}

export function Nav() {
    const navItems = [
        { icon: faUser, text: 'For You', to: '/' },
        { icon: faSearch, text: 'Search', to: '/search' },
        { icon: faMap, text: 'Map', to: '/map' },
        { icon: faCog, text: 'Settings', to: '/settings' },
    ]
    return <nav className="flex justify-between bg-[#242424] text-white text-2xl px-9 py-4">
        {navItems.map((item, index) => <NavItem key={index} icon={item.icon} text={item.text} to={item.to} />)}
    </nav>;
}