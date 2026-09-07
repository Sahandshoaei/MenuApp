
// import { motion } from "framer-motion";
// import { CATEGORY_ICON_MAP } from "../../../entities/menu/constants/categoryIcons";

// type Props = {
//   id: string;
//   title: string;
//   icon: string;
//   itemCount?: number;

//   glowColor?: string;
//   gradient?: string;
//   onClick: () => void;
// };

// const CategoryCard = ({
//   id,
//   title,
//   icon,
//   onClick,
// }: Props) => {
//   const LucideCategoryIcon = CATEGORY_ICON_MAP[id];

//   return (
//     <motion.div
//       variants={{
//         hidden: {
//           opacity: 0,
//           y: 45,
//           scale: 0.96,
//         },

//         visible: {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//         },
//       }}
//       transition={{
//         duration: 0.55,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileTap={{
//         scale: 0.97,
//       }}
//       onClick={onClick}
//       className="
//         flex
//         flex-col
//         items-center
//         justify-center
//         gap-2
//         rounded-3xl
//         bg-[var(--color-surface)]
//         px-4
//         py-7
//         text-center
//         shadow-[0_6px_20px_rgba(34,28,94,0.06)]
//         cursor-pointer
//         transition-shadow
//         duration-300
//         hover:-translate-y-0.5
//         hover:shadow-[0_10px_28px_rgba(34,28,94,0.12)]
//       "
//     >
//       {LucideCategoryIcon ? (
//         <LucideCategoryIcon
//           size={50}
//           strokeWidth={1.75}
//           className="text-[var(--color-accent)]"
//         />
//       ) : (
//         <span className="text-4xl">
//           {icon}
//         </span>
//       )}

//       <h3
//         className="
//           mt-1
//           text-sm
//           font-semibold
//           text-[var(--color-text-primary)]
//         "
//       >
//         {title}
//       </h3>
//     </motion.div>
//   );
// };

// export default CategoryCard;

import { motion } from "framer-motion";

import { CATEGORY_ICON_MAP } from "../../../entities/menu/constants/categoryIcons";

import { menuItemVariants } from "../../../shared/animations/menuVariants";

type Props = {
  id: string;
  title: string;
  icon: string;
  onClick: () => void;
};

const CategoryCard = ({
  id,
  title,
  icon,
  onClick,
}: Props) => {
  const LucideCategoryIcon = CATEGORY_ICON_MAP[id];

  return (
    <motion.div
      variants={menuItemVariants}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      className="
        flex
        flex-col
        items-center
        justify-center
        gap-2
        rounded-3xl
        bg-[var(--color-surface)]
        px-4
        py-7
        text-center
        shadow-[0_6px_20px_rgba(34,28,94,0.06)]
        cursor-pointer
        transition-shadow
        duration-300
        hover:-translate-y-0.5
        hover:shadow-[0_10px_28px_rgba(34,28,94,0.12)]
      "
    >
      {LucideCategoryIcon ? (
        <LucideCategoryIcon
          size={50}
          strokeWidth={1.75}
          className="text-[var(--color-accent)]"
        />
      ) : (
        <span className="text-4xl">
          {icon}
        </span>
      )}

      <h3
        className="
          mt-1
          text-sm
          font-semibold
          text-[var(--color-text-primary)]
        "
      >
        {title}
      </h3>
    </motion.div>
  );
};

export default CategoryCard;