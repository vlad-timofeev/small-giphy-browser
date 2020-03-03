import React from 'react';

import styles from './FullscreenGif.module.css';

import Gif from './Gif';

export default function GifFullscreen({ gif, onClose }) {
  return (
    gif && (
      <div className={styles.gifFullscreenContainer} onClick={onClose}>
        <div className={styles.title}>{gif.title}</div>
        <div
          className={styles.fullscreenGif}
          onClick={e => e.stopPropagation()}
        >
          <Gif gif={gif} fullScreen />
        </div>
        <div className={styles.fullscreenHint}>
          Click outside the GIF to exit the fullscreen view
        </div>
      </div>
    )
  );
}
