import styles from './styles.module.css';
import withSkeleton from '../../helpers/hocs/withSkeleton.tsx';
import NewsBanner from '../NewsBanner/NewsBanner.tsx';
import { INews } from '../../interfaces/index.ts';
import { FC } from 'react';

interface BannersProps {
  banners?: INews[]
}

const BannersList: FC<BannersProps> = ({ banners }) => {
  return (
    <ul className={styles.banners}>
      {
        banners?.map((banner) => {
          return <NewsBanner key={banner.id} item={banner} />;
        })
      }
    </ul>
  );
};

const NewsBannerWithSkeleton = withSkeleton(BannersList, 'banner', 10, 'row');

export default NewsBannerWithSkeleton;
