import React from 'react';
import anime from 'animejs';

class LoadingSign extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        //begin loading animation
        anime({
            targets: '.loading-rect',
            translateX: 250,
            delay: anime.stagger(100), // increase delay by 100ms for each element,
            loop: true
        }).play();
    }

    render() {
        return (
            <div className="loading-container">
                {this.props.loading
                    ?
                    <div>
                        <div className="loading-rect"></div>
                        <div className="loading-rect"></div>
                        <div className="loading-rect"></div>
                    </div>
                    :
                    <div style={{ width: "10px", height: "10px", position: "absolute" }}></div>}
            </div>
        );
    }
}

export default LoadingSign;