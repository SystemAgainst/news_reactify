import Skeleton from '../../components/Skeleton/Skeleton.tsx';
import { ComponentType } from 'react';
import { DirectionType, SkeletonType } from '../../interfaces';

interface Props {
  isLoading: boolean;
}

function withSkeleton<P extends object>(Component: ComponentType<P>, type?: SkeletonType, count?: number, direction?: DirectionType) {
  return function withSkeleton(props: Props & P) {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return <Skeleton type={type} count={count} direction={direction} />;
    }

    return <Component {...rest as P} type={type} count={count} />;
  };
}

export default withSkeleton;
