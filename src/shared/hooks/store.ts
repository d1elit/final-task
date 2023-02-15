import { useMemo } from 'react';

import type {
  ActionCreator,
  ActionCreatorsMapObject,
  AsyncThunk,
} from '@reduxjs/toolkit';

import { bindActionCreators } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  /*eslint-disable */
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
  /*eslint-enable */
};

/*eslint-disable */
type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  /*eslint-enable */
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export const useActionCreators = <
  Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};
