import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

const HeroSection = ({
  title,
  children,
  image,
  buttons,
  icon = null,
  imageWidth = '550px',
}) => {
  const Icon = icon;

  return (
    <div className="container margin-vert--xl">
      <div className="row">
        <div className="col col--6">
          <div className="col-demo">
            <div
              style={{
                display: 'flex',
                gap: '5px',
                flexWrap: 'nowrap',
                alignItems: 'center',
              }}
            >
              {Icon && <Icon style={{ width: '40px', height: '40px' }} />}
              <h1 className="hero__title">{title}</h1>
            </div>
            {children ? <div>{children}</div> : null}
            <div className="intro__buttons margin-top--lg">
              {buttons.map(({ href, title, className, onClick }, idx) =>
                onClick ? (
                  <a
                    onClick={onClick}
                    className={clsx('button button--lg', className)}
                  >
                    {title}
                  </a>
                ) : (
                  <Link
                    className={clsx('button button--lg', className)}
                    href={href}
                    key={idx}
                  >
                    {title}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
        <div className="col col--6">
          <div className="col-demo">
            <div
              style={{
                display: 'flex',
                alignItems: 'right',
                justifyContent: 'right',
              }}
            >

              <img src={image} style={{ width: imageWidth }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
