import { useLoyalty } from "@/entities/loyalty/hooks/useLoyalty";
import { useAppSelector } from "@/app/store/hooks";
import { selectRankConfig } from "@/entities/loyalty/state/loyaltySelector";


const LoyaltyProgress = () => {

  const {
    loyalty,
    rank,
  } = useLoyalty();

  const rankConfig = useAppSelector(selectRankConfig);

  const RANK_PROGRESS = {
    none: {
      min: 0,
      max: rankConfig.bronze.minSpent,
      next: "Bronze",
    },

    bronze: {
      min: rankConfig.bronze.minSpent,
      max: rankConfig.silver.minSpent,
      next: "Silver",
    },

    silver: {
      min: rankConfig.silver.minSpent,
      max: rankConfig.gold.minSpent,
      next: "Gold",
    },

    gold: {
      min: rankConfig.gold.minSpent,
      max: rankConfig.gold.minSpent,
      next: "Max Rank",
    },
  };



  if (!loyalty) return null;



  const config = RANK_PROGRESS[rank] ?? RANK_PROGRESS.none;



  const spent = loyalty.totalSpent;



  const progress =
    rank === "gold"
      ? 100
      :
      Math.min(
        100,
        ((spent - config.min) /
          (config.max - config.min)) *
          100
      );



  const remaining =
    Math.max(
      config.max - spent,
      0
    );


  return (

    <div
      className="
        rounded-3xl
        border
        border-[var(--color-border)]
        bg-[var(--color-accent-tint)]
        p-5
      "
    >

      <div className="flex justify-between">

        <div>

          <p
            className="
              text-xs
              text-[var(--color-text-secondary)]
            "
          >
            Progress to {config.next}
          </p>


          <h3
            className="
              mt-1
              text-lg
              font-semibold
              text-[var(--color-text-primary)]
            "
          >
            {spent}$
          </h3>

        </div>


        <span
          className="
            text-sm
            font-medium
            text-[var(--color-accent)]
          "
        >
          {Math.round(progress)}%
        </span>


      </div>



      {/* Progress bar */}

      <div
        className="
          mt-5
          h-3
          overflow-hidden
          rounded-full
          bg-[var(--color-accent-tint-strong)]
        "
      >

        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-[#6A689A]
            to-[#221C5E]
            transition-all
          "
          style={{
            width:`${progress}%`,
          }}
        />


      </div>



      {
        rank !== "gold" && (

          <p
            className="
              mt-3
              text-xs
              text-[var(--color-text-secondary)]
            "
          >
            Spend ${remaining}
            {" "}
            more to reach {config.next}
          </p>

        )
      }


    </div>

  );

};


export default LoyaltyProgress;