import styles from './styles.module.css';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.ts';
import NewsFilters from '../NewsFilters/NewsFilters.tsx';
import NewsList from '../NewsList/NewsList.tsx';
import { useFilters } from '../../helpers/hooks/useFilters.ts';
import { useDebounce } from '../../helpers/hooks/useDebounce.ts';
import { useFetch } from '../../helpers/hooks/useFetch.ts';
import { getNews } from '../../api/news.ts';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper.tsx';

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

      <PaginationWrapper
        top
        bottom
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        handlePrevPage={handlePrevPage}
      >
        <NewsList
          isLoading={isLoading}
          news={data?.news}
        />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;