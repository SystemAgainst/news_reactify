import styles from './styles.module.css';
import Image from '../Image/Image.tsx';
import { formatTimeAgo } from '../../helpers/formatTimeAgo.ts';
import withSkeleton from '../../helpers/hocs/withSkeleton.tsx';
import { INews } from '../../interfaces';
import { FC } from 'react';

interface Props {
  item: INews;
}

const NewsBanner: FC<Props> = ({ item }) => {
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

const NewsBannerWithSkeleton = withSkeleton(NewsBanner, 'banner', 1);

export default NewsBannerWithSkeleton;
