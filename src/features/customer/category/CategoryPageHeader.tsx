import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryPageHeaderProps {
  title: string;
}

const CategoryPageHeader = ({ title }: CategoryPageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-tint)]"
      >
        <ChevronLeft size={22} />
      </button>

      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{title}</h1>
    </div>
  );
};

export default CategoryPageHeader;
