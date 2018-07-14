import React from "react";

import './Loading.scss'
import ipfsLoaderGif from '../../../public/media/loading.gif'

// Not found page component
export default class LoadingIPFSData extends React.Component {
    // render
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    {console.log('Inside IPFS Loading page')}
                    <img src={ipfsLoaderGif} alt='ipfs loading gif' className='loading_gif' />
                </div>
            </main>
        )
    }
}