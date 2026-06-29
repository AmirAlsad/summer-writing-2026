import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// A render/commit error anywhere below this boundary used to unmount the entire
// React root, leaving the bare <body> background and nothing else — a blank
// page that only a manual refresh could recover. This boundary catches such an
// error, keeps the app shell alive, and offers a one-click reload instead of a
// silent dead page. (React error boundaries must be class components.)
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface it for diagnosis rather than swallowing it.
    console.error("Unhandled render error:", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-[24px] bg-[var(--paper)] text-[var(--ink)] px-[20px] text-center">
        <h1 className="font-display font-black text-[40px] leading-[0.9] tracking-[-1px]">
          Something broke.
        </h1>
        <p className="font-serif italic text-[18px] text-[var(--ink-soft)] max-w-[420px]">
          This page hit an unexpected error. Reloading usually clears it.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="font-mono text-[12px] font-bold tracking-[0.08em] uppercase border-[3px] border-[var(--ink)] px-[16px] py-[10px] bg-[var(--paper)] text-[var(--ink)] shadow-[5px_5px_0_var(--ink)] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[8px_8px_0_var(--ink)] transition-all duration-150 cursor-pointer focus-visible:outline-[3px] focus-visible:outline-[var(--hot-pink)] focus-visible:outline-offset-2"
        >
          Reload
        </button>
      </div>
    );
  }
}
