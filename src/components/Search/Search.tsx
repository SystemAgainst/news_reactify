import styles from './styles.module.css';
import { ChangeEvent, FC } from 'react';
import { useTheme } from '../../context/ThemeContext.tsx';

interface Props {
  keywords: string;
  setKeywords: (keywords: string) => void;
}

const Search: FC<Props> = ({ keywords, setKeywords }) => {
  const { isDark } = useTheme();


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  return (
    <div className={`${styles.search} ${isDark ? styles.dark : styles.light}`}>
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
