/**
 * Returns the styles for a navigation link.
 *
 * @param {Object} options - The options for the navigation link styles.
 * @param {boolean} options.isActive - Indicates whether the link is active.
 * @returns {Object} The styles for the navigation link.
 */
export const navLinkStyles = ({ isActive }) => {
  return {
    color: isActive ? '#00ffe5' : '#ffffff',
  };
};
