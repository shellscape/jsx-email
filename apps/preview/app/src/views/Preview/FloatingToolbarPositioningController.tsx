// IMPORTANT: you need to apply "pointer-events-auto" to any contents that should be hoverable.

export const FlaotingToolbarPositioningController = ({ children }) => (
  <div className="absolute inset-0 w-full flex justify-end pointer-events-none">
    <div className="sticky top-0 pt-4 right-0 pr-7 h-max w-max">{children}</div>
  </div>
);
