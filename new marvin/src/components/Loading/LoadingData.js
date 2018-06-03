import React from "react";

import './Loading.scss'
import loadingGif from '../../../public/media/loading.gif'

// Not found page component
export default class LoadingData extends React.Component {
    // render
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    {console.log('Inside LoadingData page')}
                    <img src={loadingGif} alt='loading gif' className='loading_gif' />
                </div>
            </main>
        )
    }
}