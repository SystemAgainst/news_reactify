import Pagination from '../Pagination/Pagination.tsx';
import { FC, ReactNode } from 'react';
import { IPaginationProps } from '../../interfaces';

interface Props {
  top?: boolean;
  bottom?: boolean;
  children: ReactNode;
}

const PaginationWrapper: FC<Props & IPaginationProps> = ({
  top,
  bottom,
  children,
  ...props
}) => {
  return (
    <>
      {top && <Pagination {...props} />}

      {children}

      {bottom && <Pagination {...props} />}
    </>
  );
};

export default PaginationWrapper;
