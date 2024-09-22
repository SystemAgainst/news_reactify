import styles from './styles.module.css';
import { forwardRef } from 'react';

const Categories = forwardRef(({ categories, selectedCategory, setSelectedCategories }, ref) => {
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
