import styles from './styles.module.css';
import Categories from '../Categories/Categories.tsx';
import Search from '../Search/Search.tsx';
import Slider from '../Slider/Slider.tsx';
import { IFilters } from '../../interfaces';
import { FC } from 'react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { useGetCategoriesQuery } from '../../store/services/newsApi.ts';

interface Props {
  filters: IFilters;
  changeFilter: (key: string, value: string | null | number) => void;
}

const NewsFilters: FC<Props> = ({ filters, changeFilter }) => {
  const { isDark } = useTheme();

  const { data } = useGetCategoriesQuery(null);

  return (
    <div className={styles.filters}>
      {data ? (
        <Slider isDark={isDark}>
          <Categories
            categories={data?.categories}
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
