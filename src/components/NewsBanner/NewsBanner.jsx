import styles from './styles.module.css';
import Image from '../Image/Image.jsx';
import { formatTimeAgo } from '../../helpers/formatTimeAgo.js';

const NewsBanner = ({ item }) => {
  return (
    <div className={styles.banner}>
      <Image image={item?.image} />
      <h3 className={styles.banner__title}>{item?.title}</h3>
      <p className={styles.banner__extra}>
        {formatTimeAgo(item?.published)} by {item?.author}
      </p>
    </div>
  );
};

export default NewsBanner;
