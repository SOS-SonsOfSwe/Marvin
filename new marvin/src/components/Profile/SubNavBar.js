import React, { Component } from 'react'
import { OnlyUniSubLinks, OnlyStudentSubLinks, OnlyProfSubLinks, OnlyUniAdminSubLinks } from './SubNavButtons'

export default class SubNavBar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar pure-menu pure-menu-horizontal subnav">
                    <ul className="pure-menu-list">
                        <OnlyProfSubLinks />
                        <OnlyStudentSubLinks />
                        <OnlyUniAdminSubLinks>
                            <OnlyUniSubLinks />
                        </OnlyUniAdminSubLinks>
                    </ul>
                </nav>
            </div>
        );
    }
}