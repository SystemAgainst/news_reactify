import styles from './styles.module.css';
import Categories from '../Categories/Categories.tsx';
import Search from '../Search/Search.tsx';
import Slider from '../Slider/Slider.tsx';
import { IFilters } from '../../interfaces';
import { FC } from 'react';
import { useTheme } from '../../context/ThemeContext.tsx';
import { useGetCategoriesQuery } from '../../store/services/newsApi.ts';
import { getFilters } from '../../store/slices/newsSlice.ts';
import { useAppDispatch } from '../../store';

interface Props {
  filters: IFilters;
}

const NewsFilters: FC<Props> = ({ filters }) => {
  const { isDark } = useTheme();

  const { data } = useGetCategoriesQuery(null);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.filters}>
      {data ? (
        <Slider isDark={isDark}>
          <Categories
            categories={data?.categories}
            selectedCategory={filters.category}
            setSelectedCategories={(category) =>
              dispatch(getFilters({ key: 'page_number', value: category }))
            }
          />
        </Slider>
      ) : null}

      <Search
        keywords={filters.keywords}
        setKeywords={(keywords) =>
          dispatch(getFilters({ key: 'keywords', value: keywords }))
        }
      />
    </div>
  );
};

export default NewsFilters;
