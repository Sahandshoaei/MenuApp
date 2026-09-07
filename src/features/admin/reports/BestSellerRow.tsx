interface BestSellerRowProps {
  rank: number;
  name: string;
  quantity: number;
  revenue: number;
}

const BestSellerRow = ({ rank, name, quantity, revenue }: BestSellerRowProps) => {
  return (
    <div className="flex items-center justify-between border-t border-amber-900/10 px-4 py-3 first:border-t-0">
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {rank}
        </span>
        <span className="text-sm text-white">{name}</span>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-xs text-zinc-500">{quantity} فروش</span>
        <span className="text-sm font-medium text-zinc-200">${revenue.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default BestSellerRow;
