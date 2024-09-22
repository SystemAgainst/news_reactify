import styles from './styles.module.css';
import { getNews } from '../../api/news.js';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import { PAGE_SIZE } from '../../constants/constants.js';
import { useFetch } from '../../helpers/hooks/useFetch.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import LatestNews from '../../components/LatestNews/LatestNews.jsx';
import NewsByFilters from '../../components/NewsByFilters/NewsByFilters.jsx';

const Main = () => {
  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: '',
  });

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data: dataNews, isLoading: isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  return (
    <main className={styles.main}>
      <LatestNews
        isLoading={isLoading}
        banners={dataNews && dataNews?.news}
      />

      <NewsByFilters
        news={dataNews?.news}
        isLoading={isLoading}
        filters={filters}
        changeFilters={changeFilters}
      />
    </main>
  );
};

export default Main;
