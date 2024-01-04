import React from 'react';

const SectionLayout = ({ title, description, children, style, titleStyle ,descriptionStyle}) => {
  return (
    <section className="page__section" style={style}>
      <div className="container">
        <h2
          className="section__header text--left"
          style={{ padding: '10px', ...titleStyle }}
        >
          {title}
        </h2>
        {description && (
          <p className="text--left" style={{ whiteSpace: 'pre-wrap' ,...descriptionStyle}}>
            {description}
          </p>
        )}
        <div style={{ marginTop: '30px' }}>{children}</div>
      </div>
    </section>
  );
};

export default SectionLayout;
