import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  return (
    <div className='flex justify-center items-center h-screen w-full flex-col gap-4'>
      <div className='flex flex-col items-center content-center'>
        <h1 className='text-red-600 text-3xl '>Something went wrong 😢</h1>
        <p className='text-red-600'>{error.data || error.message}</p>
      </div>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
