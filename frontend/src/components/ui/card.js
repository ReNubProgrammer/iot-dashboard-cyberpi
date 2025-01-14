// Card Component
export function Card({ children, ...props }) {
    return (
      <div
        {...props}
        className={`bg-white shadow rounded-lg p-6 ${props.className}`}
      >
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, ...props }) {
    return (
      <div {...props} className={`mt-4 ${props.className}`}>
        {children}
      </div>
    );
  }
  
  export function CardDescription({ children, ...props }) {
    return (
      <p {...props} className={`text-sm text-gray-500 ${props.className}`}>
        {children}
      </p>
    );
  }
  
  export function CardHeader({ children, ...props }) {
    return (
      <div {...props} className={`border-b pb-2 mb-4 ${props.className}`}>
        {children}
      </div>
  );
}

export function CardTitle({ children, ...props }) {
  return (
    <h2 {...props} className={`text-lg font-semibold text-gray-800 ${props.className}`}>
      {children}
    </h2>
  );
}
