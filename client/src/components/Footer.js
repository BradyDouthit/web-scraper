import React from 'react';

function Footer (props) {
    return (
        <div className="footer dark">
            <div id="footer-message" dangerouslySetInnerHTML={{__html: props.message}} />
            <strong onClick={props.closeFooter()} id="footer-close">X</strong>
        </div>
    );
}

export default Footer;