import styles from './styles.module.css';
import { DirectionType, SkeletonType } from '../../interfaces';
import { FC } from 'react';

interface Props {
  count: number;
  type: SkeletonType;
  direction: DirectionType;
}

const Skeleton: FC<Props> = ({ count = 1, type = 'banner', direction = 'column' }) => {
  return (
    <>
      {count > 1 ? (
        <ul
          className={
            direction === 'column' ? styles.columnList : styles.rowList
          }
        >
          {[...Array(count)].map((_, index) => (
            <li
              key={index}
              className={type === 'banner' ? styles.banner : styles.item}
            ></li>
          ))}
        </ul>
      ) : (
        <li className={type === 'banner' ? styles.banner : styles.item}></li>
      )}
    </>
  );
};

export default Skeleton;
