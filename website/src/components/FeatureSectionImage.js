import React from 'react';
import Link from '@docusaurus/Link';

const FeatureSectionImage = ({
  title,
  image,
  imgWidth,
  imgHeight,
  btnText,
  btnLink,
  direction = 'left',
  children,
}) => {
  return (
    <section className="page__section">
      <div className="container">
        <div
          className="row"
          style={{
            flexDirection: direction === 'right' ? 'row-reverse' : 'row',
          }}
        >
          <div className="col">
            <div className="col-demo">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: '550px',
                }}
              >
                <div>
                  <h2>{title}</h2>
                  {children ? <div>{children}</div> : null}
                  <Link
                    className="button button--outline button--primary"
                    to={btnLink}
                  >
                    {btnText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="col-demo">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '580px',
                }}
              >
                <img src={image} style={{ height: imgHeight, width: imgWidth }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSectionImage;
