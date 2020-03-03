import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { VIEWPORT_LOADING_MARGIN } from '../../../config';
import styles from './Gif.module.css';

// gif - gif metadata and urls
// blockLoading - don't load this GIF even if it's in view
// onInView - callback to execute when the GIF became visible for the 1st time
// onGifLoad - callback when the GIF loaded its image or failed to do so
// fullScreen - whether fullscreen version on the GIF must be used
export default function Gif({
  gif,
  blockLoading,
  onInView,
  onGifLoad,
  fullScreen,
}) {
  const { title } = gif;
  const targetGif = !fullScreen ? gif.fixedHeightGif : gif.originalGif;
  const { height, width, url } = targetGif;
  const [ref, inView] = useInView({
    rootMargin: `${VIEWPORT_LOADING_MARGIN}px 0px`,
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && onInView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <div
      ref={ref}
      className={styles.gifImage}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      {inView && !blockLoading ? (
        <img
          alt={title}
          height={height}
          width={width}
          src={url}
          onLoad={onGifLoad}
          onError={onGifLoad}
        />
      ) : null}
    </div>
  );
}
