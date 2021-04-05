import React, { useEffect, useRef } from 'react';

import { debounce } from '../../../helpers/debounce';

const LazyLoad = ({
  onLoadMore,
  scrollBuffer = 100,
  className = '',
  isDisabledLoad = false,
  children
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref) {
      return;
    }

    addListeners();

    return () => {
      removeListeners();
    }
  }, [ref])

  const onScrollResize = () => {
    if (!ref) {
      return;
    }

    const heightOfScrolledContent = ref.current.scrollTop + ref.current.offsetHeight;
    const heightOfAllContent = ref.current.offsetHeight;
    const heightOfNotScrolledContent = heightOfAllContent - heightOfScrolledContent;

    if (heightOfNotScrolledContent < scrollBuffer) {
      if (!isDisabledLoad) {
        onLoadMore();
      }
    }
  }

  const addListeners = () => {
    const trigger = debounce(onScrollResize, 300);
    ref.current.addEventListener('scroll', trigger);
    ref.current.addEventListener('resize', trigger);
  }

  const removeListeners = () => {
    ref.current.removeEventListener('scroll', onScrollResize);
    ref.current.removeEventListener('resize', onScrollResize);
  }

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
