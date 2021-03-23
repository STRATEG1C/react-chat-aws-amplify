import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PageWrapper = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-wrapper__header">
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  )
}

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,

  // I've found it on StackOverflow :)
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default PageWrapper;
