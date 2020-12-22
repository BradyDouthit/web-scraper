import React from 'react';

function HTMLRender (props) {
    return (
        <div id="third-party-div">
            {props.url ? <p>The site you queried: <a href={props.url}>{props.url}</a></p> : <div></div>}
            <iframe
                id="third-party-html"
                name="third-party-html"
                title="third-party-html"
                srcDoc={props.html} />
        </div>
    )
}

export default HTMLRender;