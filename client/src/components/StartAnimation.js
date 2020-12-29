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
        let delay = 2000;
        let duration = 1000;

        anime.timeline({
            delay: delay,
            duration: duration,
            easing: 'linear'
        }).add({
            targets: '#logo-bg',
            background: 'rgb(0, 0, 0)'
        })
        .add({
            targets: '#logo-bg',
            background: 'rgb(255, 255, 255)',
            complete: () => {
                this.props.setAnimState(true)
            }
        });

        anime({
            targets: '#logo-fg',
            background: 'rgb(255, 255, 255)',
            delay: delay,
            duration: duration,
            easing: 'linear'
        }).play();

        anime({
            targets: '#laptop-browser',
            background: 'rgb(255, 255, 255)',
            delay: delay,
            duration: duration,
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