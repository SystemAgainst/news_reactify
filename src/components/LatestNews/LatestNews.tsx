import BannersList from '../BannersList/BannersList.js';
import styles from './styles.module.css';
import { useFetch } from '../../helpers/hooks/useFetch.ts';
import { getLatestNews } from '../../api/news.ts';
import { NewsApiResponse } from '../../interfaces';

const LatestNews = () => {
  const { data: dataLastNews, isLoading } = useFetch<NewsApiResponse, null>(
    getLatestNews,
  );
  return (
    <section className={styles.section}>
      <BannersList banners={dataLastNews?.news} isLoading={isLoading} />
    </section>
  );
};

export default LatestNews;
