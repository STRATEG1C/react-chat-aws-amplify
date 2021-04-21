import React, { useRef } from 'react';

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
      if (!isDisabledLoad) {
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

export default LazyLoad;
