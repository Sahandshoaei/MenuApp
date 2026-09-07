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
        <h2 className="text-lg font-semibold text-[#221C5E]">
          Today's Offer
        </h2>

        <p className="text-sm text-[#4A4A52]">
          Special offer for today
        </p>
      </div>

      <OfferCard item={todayOffer} />
    </section>
  );
};

export default TodayOffer;



                // Entity Menu
                //     │
                //     │ getTodayOffer()
                //     ▼
                // TodayOffer
                //     │
                //     │ item
                //     ▼
                // OfferCard