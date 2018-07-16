import React, { Component } from 'react'
import { OnlyUniSubLinks, OnlyStudentSubLinks, OnlyProfSubLinks, OnlyUniAdminSubLinks } from './SubNavButtons'

export default class SubNavBar extends Component {
    constructor (props){
        super(props);
        this.state = {
            mobile: false
        };
        this.toggleMobile = this.toggleMobile.bind(this)
    }
         toggleMobile(){
            console.log("toggleMobile")
            this.setState({mobile: !this.state.mobile})
        }
    
    render() {
        return (
            <div>
                 <div className={"btn-responsive-menu "} onClick={this.toggleMobile}>Menù</div>
                 <nav className={"navbar pure-menu pure-menu-horizontal subnav"+ (this.state.mobile ? " show" : "")} >
                    <ul className="pure-menu-list pure-menu-sublist">
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