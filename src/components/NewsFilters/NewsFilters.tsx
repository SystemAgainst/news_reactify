import styles from './styles.module.css';
import Categories from '../Categories/Categories.tsx';
import Search from '../Search/Search.tsx';
import { getCategories } from '../../api/news.ts';
import { useFetch } from '../../helpers/hooks/useFetch.ts';
import Slider from '../Slider/Slider.tsx';

const NewsFilters = ({ filters, changeFilters }) => {
  const { data: dataCategories } = useFetch(getCategories);

  return (
    <div className={styles.filters}>
      {dataCategories
        ? (
        <Slider>
          <Categories
            categories={dataCategories?.categories}
            selectedCategory={filters.category}
            setSelectedCategories={(category) => changeFilters('category', category)}
          />
        </Slider>
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilters('keywords', keywords)}
      />
    </div>
  );
};

export default NewsFilters;