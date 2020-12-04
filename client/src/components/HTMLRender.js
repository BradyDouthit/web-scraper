import React from 'react';

function HTMLRender (props) {
    return (
        <div id="third-party-div">
            <iframe
                id="third-party-html"
                name="third-party-html"
                title="third-party-html"
                srcDoc={props.html} />
        </div>
    )
}

export default HTMLRender;