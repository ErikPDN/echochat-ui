interface ButtonPrimaryProps {
  onClick: () => void;
  text: string;
  isLoading?: boolean;
  disabledCondition?: boolean;
}

export const ButtonPrimary = ({
  onClick,
  text,
  isLoading,
  disabledCondition = false,
}: ButtonPrimaryProps) => {
  return (
    <button
      type="button"
      className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer"
      onClick={onClick}
      disabled={disabledCondition}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      ) : (
        text
      )}
    </button>
  );
};
