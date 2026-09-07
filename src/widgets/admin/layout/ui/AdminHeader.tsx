interface AdminHeaderProps {
  title: string;
}

const AdminHeader = ({ title }: AdminHeaderProps) => {
  return (
    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-amber-900/30
        bg-[#332016]
        px-6
        py-4
      "
    >
      <h1 className="text-lg font-semibold text-white">
        {title}
      </h1>

      {/* جای رزرو شده برای بعد: زنگوله نوتیفیکیشن سفارش جدید، پروفایل ادمین و ... */}
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-9 w-9
            items-center
            justify-center
            rounded-full
            bg-primary
            text-sm
            font-bold
          "
        >
          A
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
