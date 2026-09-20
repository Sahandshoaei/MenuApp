interface BestSellerRowProps {
  rank: number;
  name: string;
  quantity: number;
  revenue: number;
}

const BestSellerRow = ({ rank, name, quantity, revenue }: BestSellerRowProps) => {
  return (
    <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3 first:border-t-0">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent-tint)] text-xs font-semibold text-[var(--color-accent)]">
          {rank}
        </span>
        <span className="text-sm text-[var(--color-text-primary)]">{name}</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-xs text-[var(--color-text-secondary)]">{quantity} فروش</span>
        <span className="text-sm font-medium text-[var(--color-text-primary)]">${revenue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BestSellerRow;
