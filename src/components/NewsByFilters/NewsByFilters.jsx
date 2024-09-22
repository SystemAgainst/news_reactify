import styles from './styles.module.css';
import Pagination from '../Pagination/Pagination.jsx';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js';
import NewsFilters from '../NewsFilters/NewsFilters.jsx';
import NewsList from '../NewsList/NewsList.jsx';
import { useFilters } from '../../helpers/hooks/useFilters.js';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import { useFetch } from '../../helpers/hooks/useFetch.js';
import { getNews } from '../../api/news.js';

const NewsByFilters = () => {
  const { filters, changeFilters } = useFilters({
    page_number: 1,
    page_size: PAGE_SIZE,
    category: null,
    keywords: '',
  });

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useFetch(getNews, {
    ...filters,
    keywords: debouncedKeywords,
  });

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilters("page_number", filters.page_number + 1);
    }
  };

  const handlePrevPage = () => {
    if (filters.page_number > 1) {
      changeFilters("page_number", filters.page_number - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    changeFilters("page_number", pageNumber);
  };

  return (
    <section className={styles.section}>
      <NewsFilters
        filters={filters}
        changeFilters={changeFilters}
      />

      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        handlePrevPage={handlePrevPage}
      />

      <NewsList
        isLoading={isLoading}
        news={data?.news}
      />

      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        handlePrevPage={handlePrevPage}
      />
    </section>
  );
};

export default NewsByFilters;