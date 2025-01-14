// Input Component
export function Input({ ...props }) {
    return (
      <input
        {...props}
        className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 ${props.className}`}
      />
    );
  }