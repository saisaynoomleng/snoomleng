import { Bounded } from '@snoomleng/ui';
import { MdOutlineError } from 'react-icons/md';

const UnauthorizedPage = () => {
  return (
    <Bounded>
      <p className="font-semibold text-brand-error-600 text-fs-600">
        You are not authorized to be here
      </p>
      <p>
        <MdOutlineError size={30} />
      </p>
    </Bounded>
  );
};

export default UnauthorizedPage;
