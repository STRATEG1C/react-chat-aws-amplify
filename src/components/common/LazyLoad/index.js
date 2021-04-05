import React, { useCallback, useEffect, useRef } from 'react';

import { debounce } from '../../../helpers/debounce';

const LazyLoad = ({
  onLoadMore,
  scrollBuffer = 100,
  className = '',
  isDisabledLoad = false,
  children
}) => {
  const ref = useRef(null);

  const onScrollResize = useCallback(() => {
    if (!ref) {
      return;
    }

    const heightOfScrolledContent = ref.current.scrollTop + ref.current.offsetHeight;
    const heightOfAllContent = ref.current.offsetHeight;
    const heightOfNotScrolledContent = heightOfAllContent - heightOfScrolledContent;

    if (heightOfNotScrolledContent < scrollBuffer) {
      if (!isDisabledLoad) {
        // TODO: component needs refactoring
        // onLoadMore();
      }
    }
  }, [ref, isDisabledLoad, onLoadMore, scrollBuffer]);

  useEffect(() => {
    if (!ref) {
      return;
    }

    const node = ref.current;

    const trigger = debounce(onScrollResize, 300);
    node.addEventListener('scroll', trigger);
    node.addEventListener('resize', trigger);

    return () => {
      node.removeEventListener('scroll', onScrollResize);
      node.removeEventListener('resize', onScrollResize);
    }
  }, [ref, onScrollResize])

  return (
    <div
      style={{height: '200px', overflow: 'scroll'}}
      className={`lazy-load ${className}`}
      ref={ ref }
    >
      { children }
    </div>
  )
}

export default LazyLoad;
