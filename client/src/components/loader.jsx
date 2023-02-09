import {BallTriangle} from 'react-loader-spinner'

export default function loader() {
  return (
    <BallTriangle
      height={100}
      width={100}
      radius={5}
      color="#000"
      ariaLabel="ball-triangle-loading"
      wrapperClass={{}}
      wrapperStyle=""
      visible={true}
    />
  );
}
