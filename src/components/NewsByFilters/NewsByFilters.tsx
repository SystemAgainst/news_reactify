import styles from './styles.module.css';
import { TOTAL_PAGES } from '../../constants/constants.ts';
import NewsFilters from '../NewsFilters/NewsFilters.tsx';
import NewsList from '../NewsList/NewsList.tsx';
import { useDebounce } from '../../helpers/hooks/useDebounce.ts';
import PaginationWrapper from '../PaginationWrapper/PaginationWrapper.tsx';
import { useGetNewsQuery } from '../../store/services/newsApi.ts';
import { useAppDispatch, useAppSelector } from '../../store';
import { getFilters } from '../../store/slices/newsSlice.ts';

const NewsByFilters = () => {
  const filters = useAppSelector((state) => state.news.filters);

  const dispatch = useAppDispatch();

  const debouncedKeywords = useDebounce(filters.keywords, 1500);

  const { data, isLoading } = useGetNewsQuery({
    ...filters,
    keywords: debouncedKeywords,
  });

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      dispatch(
        getFilters({ key: 'page_number', value: filters.page_number + 1 }),
      );
    }
  };

  const handlePrevPage = () => {
    if (filters.page_number > 1) {
      dispatch(
        getFilters({ key: 'page_number', value: filters.page_number - 1 }),
      );
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(getFilters({ key: 'page_number', value: pageNumber }));
  };

  return (
    <section className={styles.section}>
      <NewsFilters filters={filters} />

      <PaginationWrapper
        top
        bottom
        totalPages={TOTAL_PAGES}
        currentPage={filters.page_number}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        handlePreviousPage={handlePrevPage}
      >
        <NewsList isLoading={isLoading} news={data?.news} />
      </PaginationWrapper>
    </section>
  );
};

export default NewsByFilters;
