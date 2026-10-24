import Select from 'react-select';
import { useAsyncPaginate, useComponents } from 'react-select-async-paginate';
import Loader from './SearchEngineLoader/Loader';

const defaultLoadingMessage = () => <Loader />;
const defaultNoOptionsMessage = () => 'No options';

/**
 * Local select with async pagination (useAsyncPaginate + useComponents).
 * Keeps the loader mounted across the first-load frame (isFirstLoad is true
 * before isLoading flips), so animations do not restart on each keystroke.
 *
 * Only loadOptions / additional / debounceTimeout are passed to the hook.
 * Other AsyncPaginate-only options must be wired explicitly if needed.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.loadOptions - Async options loader (same contract as the library).
 * @param {Object} [props.additional] - Extra data for the first request (e.g. `{ page: 1 }`).
 * @param {number} [props.debounceTimeout=0] - Debounce for loadOptions on input change.
 * @param {Object} [props.components] - Extra react-select components (pass a stable object).
 * @param {Function} [props.loadingMessage] - Menu content while loading.
 * @param {Function} [props.noOptionsMessage] - Menu content when there are no options.
 * @returns {JSX.Element}
 */
export default function AsyncPaginate({
  loadOptions,
  additional,
  debounceTimeout = 0,
  components: componentsProp,
  loadingMessage = defaultLoadingMessage,
  noOptionsMessage = defaultNoOptionsMessage,
  ...rest
}) {
  // Adds scroll-to-bottom pagination to the menu list.
  const components = useComponents(componentsProp);

  const { isLoading, isFirstLoad, ...paginateProps } = useAsyncPaginate({
    loadOptions,
    additional,
    debounceTimeout,
  });

  // menuIsOpen covers the empty-input open frame; isFirstLoad covers the
  // keystroke frame before the library sets isLoading.
  const showLoader = isLoading || (isFirstLoad && paginateProps.menuIsOpen);

  return (
    <Select
      {...rest}
      {...paginateProps}
      isLoading={showLoader}
      components={components}
      loadingMessage={loadingMessage}
      noOptionsMessage={noOptionsMessage}
    />
  );
}
