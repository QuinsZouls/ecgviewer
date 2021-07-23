import { useSelector, useDispatch } from 'react-redux';
import { App } from '../redux/reducers/app';

export function useServiceURL() {
  const sever = useSelector(({ app }) => app.SERVER_URL);
  const dispatch = useDispatch();
  function change(value) {
    dispatch(App.appServer(value));
  }
  return [sever, change];
}
