import styles from './styles.module.css';
import NewsBanner from '../../components/NewsBanner/NewsBanner.jsx';
import { useEffect, useState } from 'react';
import { getCategories, getNews } from '../../api/news.js';
import NewsList from '../../components/NewsList/NewsList.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import Search from '../../components/Search/Search.jsx';
import { useDebounce } from '../../helpers/hooks/useDebounce.js';
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants.js';

const Main = () => {
  const [newsState, setNewsState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategories] = useState('All');
  const [keywords, setKeywords] = useState('');

  const debouncedKeywords = useDebounce(keywords, 1500);

  const fetchNews = async (currentPage) => {
    try {
      setNewsState([]);
      setIsLoading(true);
      const { news } = await getNews({
        page_number: currentPage,
        page_size: PAGE_SIZE,
        category: selectedCategory === 'All' ? null : selectedCategory,
        keywords: keywords,
      });
      setNewsState(news);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(['All', ...categories]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, selectedCategory, debouncedKeywords]);

  useEffect(() => {
    fetchCategories();
  }, []);

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
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategories={setSelectedCategories}
      />

      <Search keywords={keywords} setKeywords={setKeywords} />

      <NewsBanner isLoading={isLoading} items={newsState.length > 0 && newsState[0]} />

      <Pagination
        totalPages={TOTAL_PAGES}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        handleClickPage={handleClickPage}
        handlePrevPage={handlePrevPage}
      />

      <NewsList isLoading={isLoading} items={newsState} />
    </main>
  );
};

export default Main;
