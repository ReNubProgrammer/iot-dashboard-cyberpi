// Label Component
export function Label({ children, ...props }) {
    return (
      <label {...props} className={`block text-sm font-medium text-gray-700 ${props.className}`}>
        {children}
      </label>
    );
  }