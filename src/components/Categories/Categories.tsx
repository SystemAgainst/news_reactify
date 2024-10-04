import styles from './styles.module.css';
import { FC, ForwardedRef, forwardRef } from 'react';
import { CategoriesType } from '../../interfaces';

interface Props {
  categories: CategoriesType[];
  selectedCategory: CategoriesType | null;
  setSelectedCategories: (category: CategoriesType | null) => void;
}

const Categories: FC<Props> = forwardRef(({ categories, selectedCategory, setSelectedCategories }: Props, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={styles.categories}>
      <button
        className={!selectedCategory ? styles.active : styles.item}
        onClick={() => setSelectedCategories(null)}
      >
        All
      </button>
      {
        categories.map(category => (
          <button
            key={category}
            className={selectedCategory === category ? styles.active : styles.item}
            onClick={() => setSelectedCategories(category)}
          >
            {category}
          </button>
        ))
      }
    </div>
  );
});

Categories.displayName = 'Categories';

export default Categories;
