import React from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth, VisibleOnlyUniAdmin } from '../../authentication/wrappers'
import { Link } from 'react-router'
import LoginButtonContainer from '../../containers/App/LoginButtonContainer'
import LogoutButtonContainer from '../../containers/App/LogoutButtonContainer'

const OnlyAuthLinks = VisibleOnlyAuth(() => {
    return (
        <div className="float-right">
            <ul>
                <li className="pure-menu-item"><Link to="/costs" className="pure-menu-link">Costs</Link></li>
                <li className="pure-menu-item">
                    <Link to="/profile" className="pure-menu-link">Profile</Link>
                </li>
                <LogoutButtonContainer />
            </ul>
        </div >
    )
})

const OnlyUniAdminLinks = VisibleOnlyUniAdmin(() => {
    return (
        <div className="float-right">
            <ul>
                <li className="pure-menu-item"><Link to="/costs" className="pure-menu-link">Costs</Link></li>

                <li className="pure-menu-item">
                    <Link to="/fill-blockchain" className="pure-menu-link">Fill Blockchain</Link>
                </li>
                <li className="pure-menu-item">
                    <Link to={{
                        pathname: '/insert-user',
                        state: { fromAdminList: false, fromProfList: false }
                    }} className="pure-menu-link"> Insert User </Link>
                </li>
                <li className="pure-menu-item">
                    <Link to="/profile" className="pure-menu-link">Profile</Link>
                </li>
                <LogoutButtonContainer />
            </ul>
        </div >
    )
})

const OnlyGuestLinks = HiddenOnlyAuth(() => {
    return (
        <span>
            <li className="pure-menu-item"><Link to="/costs" className="pure-menu-link">Costs</Link></li>

            <li className="pure-menu-item">
                <Link to="/signup" className="pure-menu-link">Sign Up</Link>
            </li>
            <LoginButtonContainer />
        </span>
    )
})

export { OnlyAuthLinks, OnlyUniAdminLinks, OnlyGuestLinks } 