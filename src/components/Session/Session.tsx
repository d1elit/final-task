import { ReactNode, useEffect } from 'react';

import { useActionCreators, useAppSelector } from '../../shared/hooks/store';
import authApi from '../../shared/api/auth';
import Loader from '../Loader/Loader';

const Session: React.FC<{ children: ReactNode }> = ({ children }) => {
  const actions = useActionCreators(authApi);
  const status = useAppSelector(state => state.user.status);

  useEffect(() => {
    void actions.getMe();
  }, [actions]);

  if (status === 'loading') return <Loader />;

  return <>{children}</>;
};

export default Session;
