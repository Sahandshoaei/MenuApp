import { useMenu } from "../../../entities/menu/hooks/useMenu";
import OfferCard from "../../../features/customer/menu/OfferCard";

const TodayOffer = () => {
  const { todayOffer } = useMenu();

  if (!todayOffer) {
    return null;
  }

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          پیشنهاد امروز
        </h2>

        <p className="text-sm text-[var(--color-text-secondary)]">
          پیشنهاد ویژه برای امروز
        </p>
      </div>

      <OfferCard item={todayOffer} />
    </section>
  );
};

export default TodayOffer;
