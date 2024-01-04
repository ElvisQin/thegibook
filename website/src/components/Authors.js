import React from 'react';
import Link from '@docusaurus/Link';

const Authors = ({
    title,
    image,
    imgWidth,
    imgHeight,
    direction = 'left',
    children,
}) => {
    return (
        <section className="page__section">
            <div className="container">
                <body>
                <div id="column1" style={{
                        float: 'left',
                        width: '80%'
                    }}>
                        <h2>{title}</h2>
                        {children ? <div>{children}</div> : null}
                    </div>
                    <div id="column2" style={{ float: 'right', width: '20%' }}>  <div
                        style={{
                            display: 'flex',
                            alignItems: 'right',
                            justifyContent: 'right',
                        }}
                    >
                        <img src={image} />
                    </div></div>
                    

                </body >
            </div >
        </section >
    );
};

export default Authors;
