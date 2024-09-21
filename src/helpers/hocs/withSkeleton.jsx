import Skeleton from '../../components/Skeleton/Skeleton.jsx';

function withSkeleton (Component, type, count) {
  return function withSkeleton(props) {
    const {isLoading, ...rest} = props;

    if (isLoading) {
      return <Skeleton type={type} count={count} />;
    }

    return <Component {...rest} type={type} count={count} />;
  };
}

export default withSkeleton;
