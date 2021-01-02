import React from 'react';

function HTMLRender(props) {
    return (
        <iframe
            id="third-party-html"
            name="third-party-html"
            title="third-party-html"
            srcDoc={props.html} />
    )
}

export default HTMLRender;