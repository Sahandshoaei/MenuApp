// import {AnimatePresence,motion} from "framer-motion";
// import { X } from "lucide-react";
// import LoyaltyHeader from "@/features/customer/loyalty/LoyaltyHeader";
// import LoyaltySummary from "@/features/customer/loyalty/LoyaltySummary";
// import LoyaltyProgress from "@/features/customer/loyalty/LoyaltyProgress";
// import LoyaltyJourney from "@/features/customer/loyalty/LoyaltyJourney";

// type LoyaltyModalProps = {
//   open: boolean;
//   onClose: () => void;
// };

// const LoyaltyModal = ({open,onClose}: LoyaltyModalProps) => {

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="
//               fixed
//               inset-0
//               z-[60]
//               bg-black/70
//               backdrop-blur-sm
//             "
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//             exit={{
//               opacity: 0,
//             }}
//             onClick={onClose}
//           />

//           {/* Modal */}
//           <motion.div
//             className="
//               fixed
//               bottom-24
//               left-4
//               right-4
//               z-[70]
//               mx-auto
//               max-w-lg
//               rounded-3xl
//               bg-[#472604]
//               p-6
//               shadow-2xl
//               max-h-[80vh]
//               overflow-y-auto
//             "
//             initial={{
//               scale: 0.95,
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               scale: 1,
//               opacity: 1,
//               y: 0,
//             }}
//             exit={{
//               scale: 0.95,
//               opacity: 0,
//               y: 20,
//             }}
//             transition={{
//               duration: 0.25,
//             }}
//           >
//             {/* Close */}
//             <button
//               type="button"
//               onClick={onClose}
//               className="
//                 absolute
//                 right-4
//                 top-4
//                 rounded-full
//                 p-2
//                 text-amber-300/60
//                 transition-colors
//                 hover:bg-white/5
//                 hover:text-white
//               "
//             >
//               <X size={18} />
//             </button>

//             {/* Header */}
//             <LoyaltyHeader />

//             {/* Content */}
//             <div className="mt-8 space-y-6">

//               <LoyaltySummary />
//               <LoyaltyProgress />
//               <LoyaltyJourney />

//             </div>
            
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default LoyaltyModal;

import {AnimatePresence,motion} from "framer-motion";
import { X } from "lucide-react";
import LoyaltyHeader from "@/features/customer/loyalty/LoyaltyHeader";
import LoyaltySummary from "@/features/customer/loyalty/LoyaltySummary";
import LoyaltyProgress from "@/features/customer/loyalty/LoyaltyProgress";
import LoyaltyJourney from "@/features/customer/loyalty/LoyaltyJourney";

type LoyaltyModalProps = {
  open: boolean;
  onClose: () => void;
};

const LoyaltyModal = ({open,onClose}: LoyaltyModalProps) => {

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="
              fixed
              inset-0
              z-[60]
              bg-black/70
              backdrop-blur-sm
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="
              fixed
              bottom-24
              left-4
              right-4
              z-[70]
              mx-auto
              max-w-lg
              rounded-3xl
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-6
              shadow-2xl
              max-h-[80vh]
              overflow-y-auto
            "
            initial={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                right-4
                top-4
                rounded-full
                p-2
                text-[var(--color-accent-soft)]
                transition-colors
                hover:bg-[var(--color-accent-tint)]
                hover:text-[var(--color-accent-strong)]
              "
            >
              <X size={18} />
            </button>

            {/* Header */}
            <LoyaltyHeader />

            {/* Content */}
            <div className="mt-8 space-y-6">

              <LoyaltySummary />
              <LoyaltyProgress />
              <LoyaltyJourney />

            </div>
            
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoyaltyModal;