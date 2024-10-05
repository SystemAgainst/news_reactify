import styles from './styles.module.css';
import { FC } from 'react';

interface Props {
  image: string;
}

const Image: FC<Props> = ({ image }) => {
  return (
    <div className={styles.wrapper}>
      {image ? <img src={image} alt="news" className={styles.image} /> : null}
    </div>
  );
};

export default Image;
