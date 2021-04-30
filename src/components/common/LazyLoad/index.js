import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { debounce } from '../../../helpers/debounce';

const LazyLoad = ({
  onLoadMore,
  scrollBuffer = 100,
  className = '',
  isDisabledLoad = false,
  children
}) => {
  const ref = useRef(null);

  const onScrollResize = debounce(() => {
    if (!ref) {
      return;
    }

    const heightOfScrolledContent = ref.current.scrollTop + ref.current.clientHeight;
    const heightOfAllContent = ref.current.scrollHeight;
    const heightOfNotScrolledContent = heightOfAllContent - heightOfScrolledContent;

    if (heightOfNotScrolledContent < scrollBuffer) {
      if (!isDisabledLoad && onLoadMore) {
        onLoadMore();
      }
    }
  }, 600);

  return (
    <div
      className={`lazy-load ${className}`}
      ref={ ref }
      onScroll={onScrollResize}
    >
      { children }
    </div>
  )
}

LazyLoad.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  scrollBuffer: PropTypes.number,
  className: PropTypes.string,
  isDisabledLoad: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

LazyLoad.defaultProps = {
  scrollBuffer: 100,
  className: '',
  isDisabledLoad: false,
}

export default LazyLoad;
