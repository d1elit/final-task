import { ReactNode, useEffect } from 'react';

import { useActionCreators, useAppSelector } from '../../shared/hooks/store';
import authApi from '../../shared/api/auth';

const Session: React.FC<{ children: ReactNode }> = ({ children }) => {
  const actions = useActionCreators(authApi);
  const status = useAppSelector(state => state.user.status);

  useEffect(() => {
    void actions.getMe(null);
  }, [actions]);

  if (status === 'init')
    return (
      <div style={{ fontSize: 50, color: '#fff', textAlign: 'center' }}>
        Loading...
      </div>
    );

  return <>{children}</>;
};

export default Session;
