import React from 'react';
import anime from 'animejs';

class StartAnimation extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log('test')
        this.beginAnimation()
    }

    beginAnimation = () => {
        anime({
            targets: '#logo-bg',
            background: 'rgb(0, 0, 0)',
            delay: 2000,
            duration: 1000,
            easing: 'linear'
        }).play();

        anime({
            targets: '#logo-fg',
            background: 'rgb(255, 255, 255)',
            delay: 2000,
            duration: 1000,
            easing: 'linear'
        }).play();

        anime({
            targets: '#laptop-browser',
            background: 'rgb(255, 255, 255)',
            delay: 2500,
            duration: 1000,
            easing: 'linear'
        }).play();
    }

    render() {
        return (
            <div id="logo-bg">
                <div id="logo-fg"></div>
            </div>
        );
    }
}

export default StartAnimation;