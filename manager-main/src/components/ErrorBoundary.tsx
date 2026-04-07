import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white px-6 text-center">
          <span className="material-symbols-outlined text-5xl text-red-400 mb-4">error</span>
          <h2 className="text-xl font-bold mb-2">页面出现了问题</h2>
          <p className="text-slate-400 text-sm mb-6">{this.state.error.message}</p>
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="px-6 py-2 bg-primary-orange rounded-full text-white font-semibold active:scale-95 transition-transform"
          >
            重新加载
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
