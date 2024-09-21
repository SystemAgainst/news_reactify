import styles from './styles.module.css';
import NewsBanner from '../../components/NewsBanner/NewsBanner.jsx';
import { getCategories, getNews } from '../../api/news.js';
import NewsList from '../../components/NewsList/NewsList.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import Search from '../../components/Search/Search.jsx';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js';
import { useFetch } from '../../helpers/hooks/useFetch.js';
import { useFilters } from '../../helpers/hooks/useFilters.js';

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

  const { data: dataCategories } = useFetch(getCategories);

  const handleNextPage = () => {
    if (filters.page_number < TOTAL_PAGES) {
      changeFilters('page_number', (prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (filters.page_number > 1) {
      changeFilters('page_number', (prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    changeFilters('page_number', pageNumber);
  };

  return (
    <main className={styles.main}>
      {dataCategories
        ? <Categories
          categories={dataCategories?.categories}
          selectedCategory={filters.category}
          setSelectedCategories={(category) => changeFilters('category', category)}
        />
        : null
      }

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilters('keywords', keywords)}
      />

      <NewsBanner
        isLoading={isLoading}
        items={dataNews && dataNews?.news[0]}
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
        news={dataNews?.news}
      />
    </main>
  );
};

export default Main;
