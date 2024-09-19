import styles from './styles.module.css';

const Categories = ({ categories, selectedCategory, setSelectedCategories }) => {
  return (
    <div className={styles.categories}>
      {
        categories.map(category => (
          <button
            key={category}
            className={ selectedCategory === category ? styles.active : styles.item }
            onClick={() => setSelectedCategories(category)}
          >
            {category}
          </button>
        ))
      }
    </div>
  );
};

export default Categories;
