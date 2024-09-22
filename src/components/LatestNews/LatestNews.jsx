import BannersList from "../BannersList/BannersList";
import styles from "./styles.module.css";
import { useFetch } from '../../helpers/hooks/useFetch.js';
import { getLatestNews } from '../../api/news.js';

const LatestNews = () => {
  const { data: dataLastNews, isLoading } = useFetch(getLatestNews)
  return (
    <section className={styles.section}>
      <BannersList
        banners={dataLastNews?.news}
        isLoading={isLoading}
      />
    </section>
  );
};

export default LatestNews;