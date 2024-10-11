import React from 'react'
import { Link, useMatch } from 'react-router-dom'

const NavItem = ({to, item, name}) => {
    const route = useMatch(to)
    return (
        <Link to={to} className={`${route?.pathname === item && 'font-bold text-orange-900 text-lg '}`}>{name}</Link>
    )
}

export default NavItem