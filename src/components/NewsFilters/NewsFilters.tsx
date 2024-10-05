import styles from './styles.module.css';
import Categories from '../Categories/Categories.tsx';
import Search from '../Search/Search.tsx';
import { getCategories } from '../../api/news.ts';
import { useFetch } from '../../helpers/hooks/useFetch.ts';
import Slider from '../Slider/Slider.tsx';
import { CategoriesApiResponse, IFilters } from '../../interfaces';
import { FC } from 'react';

interface Props {
  filters: IFilters;
  changeFilter: (key: string, value: string | null | number) => void;
}

const NewsFilters: FC<Props> = ({ filters, changeFilter }) => {
  const { data: dataCategories } = useFetch<CategoriesApiResponse, null>(
    getCategories,
  );

  return (
    <div className={styles.filters}>
      {dataCategories ? (
        <Slider>
          <Categories
            categories={dataCategories?.categories}
            selectedCategory={filters.category}
            setSelectedCategories={(category) =>
              changeFilter('category', category)
            }
          />
        </Slider>
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) => changeFilter('keywords', keywords)}
      />
    </div>
  );
};

export default NewsFilters;
