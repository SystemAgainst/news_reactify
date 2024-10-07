import { cloneElement, FC, ReactElement, useRef } from 'react';
import styles from './styles.module.css';

interface Props {
  step?: number;
  children: ReactElement;
  isDark?: boolean;
}

const Slider: FC<Props> = ({ children, step = 150, isDark }) => {
  const sliderRef = useRef<HTMLElement | null>(null);

  const scrollLeft = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollLeft -= step;
  };

  const scrollRight = () => {
    if (!sliderRef.current) return
    sliderRef.current.scrollLeft += step;
  };

  return (
    <div className={`${styles.slider} ${isDark ? styles.dark : styles.light}`}>
      <button onClick={scrollLeft} className={styles.arrow}>{`<`}</button>
      {cloneElement(children, { ref: sliderRef })}
      <button onClick={scrollRight} className={styles.arrow}>{`>`}</button>
    </div>
  );
};

export default Slider;
