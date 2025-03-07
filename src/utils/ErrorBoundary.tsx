import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // Children components to be wrapped by the ErrorBoundary
  fallback?: ReactNode; // Optional fallback UI to display when an error occurs
}

interface ErrorBoundaryState {
  hasError: boolean; // Indicates whether an error has been caught
  error?: Error; // The error object
  errorInfo?: ErrorInfo; // Additional error information
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // Update state when an error is caught
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Log the error and error info
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    // Display fallback UI if an error occurred
    if (hasError) {
      return (
        fallback || (
          <div
            style={{ padding: "20px", border: "1px solid red", color: "red" }}
          >
            <h1>Something went wrong.</h1>
            <p>{error?.toString()}</p>
            <details style={{ whiteSpace: "pre-wrap" }}>
              <summary>Error Details</summary>
              {errorInfo?.componentStack}
            </details>
          </div>
        )
      );
    }

    // Render children if no error occurred
    return children;
  }
}

export default ErrorBoundary;
