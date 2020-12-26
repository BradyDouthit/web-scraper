import React from 'react';

function Footer (props) {
    return (
        <div className="footer dark">
            <div dangerouslySetInnerHTML={{__html: props.message}} />
        </div>
    );
}

export default Footer;