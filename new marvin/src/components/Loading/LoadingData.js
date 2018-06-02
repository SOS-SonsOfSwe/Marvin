import React from "react";


// Not found page component
export default class LoadingData extends React.Component {
    // render
    render() {
        return (
            <main className="container">
                <div className="pure-g">
                    {console.log('Inside LoadingData page')}
                    <img src="../../../public/media/loading.gif" alt='loading gif' />
                </div>
            </main>
        )
    }
}