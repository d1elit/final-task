import { ReactNode, useEffect } from "react";

import { useActionCreators } from "../../shared/hooks/store";
import authApi from "../../shared/api/auth";

const Session: React.FC<{ children: ReactNode }> = ({ children }) => {
  const actions = useActionCreators(authApi);

  useEffect(() => {
    actions.getMe(null);
  }, []);

  return <>{children}</>;
};

export default Session;
