import Skeleton from '../../components/Skeleton/Skeleton.jsx';

function withSkeleton ( Component, type, count, direction ) {
  return function withSkeleton(props) {
    const {isLoading, ...rest} = props;

    if (isLoading) {
      return <Skeleton type={type} count={count} direction={direction} />;
    }

    return <Component {...rest} type={type} count={count} />;
  };
}

export default withSkeleton;
