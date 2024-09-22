import styles from './styles.module.css';
import Categories from '../Categories/Categories.jsx';
import Search from '../Search/Search.jsx';
import { getCategories } from '../../api/news.js';
import { useFetch } from '../../helpers/hooks/useFetch.js';

const NewsFilters = ({ filters, changeFilters }) => {
  const { data: dataCategories } = useFetch(getCategories);

  return (
    <div className={styles.filters}>
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
    </div>
  );
};

export default NewsFilters;