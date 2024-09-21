import styles from './styles.module.css';
import NewsBanner from '../../components/NewsBanner/NewsBanner.jsx';
import { useState } from 'react';
import { getCategories, getNews } from '../../api/news.js';
import NewsList from '../../components/NewsList/NewsList.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import Search from '../../components/Search/Search.jsx';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js';
import { useFetch } from '../../helpers/hooks/useFetch.js';

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategories] = useState('All');
  const [keywords, setKeywords] = useState('');

  const debouncedKeywords = useDebounce(keywords, 1500);

  const { data: dataNews, isLoading: isLoading } = useFetch(getNews, {
    page_number: currentPage,
    page_size: PAGE_SIZE,
    category: selectedCategory === 'All' ? null : selectedCategory,
    keywords: keywords,
  });
  console.log(dataNews);

  const { data: dataCategories } = useFetch(getCategories);

  const handleNextPage = () => {
    if (currentPage < TOTAL_PAGES) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleClickPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main className={styles.main}>
      {dataCategories
        ? <Categories
          categories={dataCategories?.categories}
          selectedCategory={selectedCategory}
          setSelectedCategories={setSelectedCategories}
        />
        : null
      }

      <Search
        keywords={keywords}
        setKeywords={setKeywords}
      />

      <NewsBanner
        isLoading={isLoading}
        items={dataNews && dataNews?.news[0]}
      />

      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handleClickPage={handleClickPage}
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
