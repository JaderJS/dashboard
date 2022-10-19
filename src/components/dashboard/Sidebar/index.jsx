import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import SideBarItem from './sidebar-item'

import logo from '../../../assets/images/white-logo.png'

import { BiLogOut } from 'react-icons/bi'

import './styles.css';

function SideBar({ menu }) {
    const location = useLocation();

    const [active, setActive] = useState(1);

    useEffect(() => {
        menu.forEach(element => {
            if (location.pathname === element.path) {
                setActive(element.id)
            }
        });
    }, [location.pathname])

    return (
        <nav className='sidebar'>
            <div className='sidebar-container'>
                <div className='sidebar-logo-container'>
                    <img src={logo} alt="logo" />
                </div>

                <div className='sidebar-container'>
                    <div className='sidebar-items'>
                        {menu.map((item, index) => (
                            <div key={index} onClick={() => setActive(item.id)}>
                                <SideBarItem active={item.id === active} item={item} />
                            </div>
                        ))}
                    </div>

                    <div className='sidebar-footer'>
                        <span className='sidebar-item-label'>Logout</span>
                        <BiLogOut />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SideBar;