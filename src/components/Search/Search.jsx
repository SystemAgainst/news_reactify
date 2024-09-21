import styles from './styles.module.css';

const Search = ({ keywords, setKeywords }) => {
  const onChange = (e) => {
    setKeywords(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={keywords}
        onChange={onChange}
        className={styles.input}
        placeholder={'Search...'}
      />
    </div>
  );
};

export default Search;
