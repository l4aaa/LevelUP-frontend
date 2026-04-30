import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ctp-base text-ctp-text flex flex-col items-center justify-center p-4">
          <div className="bg-ctp-surface0 p-8 rounded-2xl border border-ctp-red/50 shadow-2xl max-w-md text-center">
            <div className="inline-flex bg-ctp-red/20 p-4 rounded-full text-ctp-red mb-6">
              <AlertTriangle size={48} />
            </div>
            <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h1>
            <p className="text-ctp-subtext0 mb-6">
              We encountered an unexpected error.
            </p>
            <button 
              onClick={() => window.location.replace('/')}
              className="bg-ctp-mauve hover:bg-ctp-mauve/90 text-ctp-base font-bold py-3 px-6 rounded-xl transition-transform active:scale-95"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}