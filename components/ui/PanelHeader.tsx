import { ArrowLeft } from "lucide-react";

interface PanelHeaderProps {
  onBackClick: () => void;
  title: string;
}

export const PanelHeader = ({ onBackClick, title }: PanelHeaderProps) => {
  return (
    <div className="flex items-center gap-2 p-4">
      <button
        type="button"
        onClick={onBackClick}
        className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-zinc-600 transition-colors duration-300 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <span className="text-lg font-medium">{title}</span>
    </div>
  );
};
