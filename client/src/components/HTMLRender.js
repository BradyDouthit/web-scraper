import React from 'react';

function HTMLRender (props) {
    return (
        <div id="third-party-div">
            <p>The site you queried: <a href={props.url}>{props.url}</a></p>
            <iframe
                id="third-party-html"
                name="third-party-html"
                title="third-party-html"
                srcDoc={props.html} />
        </div>
    )
}

export default HTMLRender;