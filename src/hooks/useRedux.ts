import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../redux/root";
import { AppDispatch } from "../redux/store";

export const useRedux = () => {
  const dispatch: AppDispatch = useDispatch();
  const useStateSelector: TypedUseSelectorHook<RootState> = useSelector;
  return { dispatch, useStateSelector };
};
