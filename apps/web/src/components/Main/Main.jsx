import { Main } from './Main.styles';

/**
 * @component
 * MainComponent is a functional component that wraps its children inside a Main element.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The children elements to be wrapped inside Main.
 * @returns {JSX.Element} The rendered MainComponent.
 */
export default function MainComponent({ children }) {
  return <Main>{children}</Main>;
}
