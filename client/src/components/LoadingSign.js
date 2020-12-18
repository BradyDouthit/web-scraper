import React from 'react';

class LoadingSign extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="loading-container">
                {this.props.loading ? <div className="loading-rect"></div> : <div style={{width: "10px", height: "10px"}}></div>}
            </div>
        );
    }
}

export default LoadingSign;