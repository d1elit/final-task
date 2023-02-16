import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../hooks/store';

export default function withoutAuth<Props extends JSX.IntrinsicAttributes>(
  Component: ComponentType<Props>
) {
  return (props: Props) => {
    const isAuth = useAppSelector(state => state.user.isAuth);
    if (!isAuth) {
      return <Component {...props} />;
    }

    return <Navigate to="/" />;
  };
}
