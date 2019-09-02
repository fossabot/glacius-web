import Loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
