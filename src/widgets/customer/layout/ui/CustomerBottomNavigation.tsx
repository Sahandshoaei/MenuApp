
// import {
//   House,
//   Heart,
//   Package,
//   User,
// } from "lucide-react";

// import {
//   NavLink,
//   useNavigate,
// } from "react-router-dom";

// import { useAppSelector } from "../../../../app/store/hooks";

// import {
//   selectCurrentCustomer,
// } from "../../../../entities/customer/state/customerSelector";

// type CustomerBottomNavigationProps = {
//   onRegisterClick: () => void;
// };

// const CustomerBottomNavigation = ({
//   onRegisterClick,
// }: CustomerBottomNavigationProps) => {
//   const navigate = useNavigate();

//   const customer =
//     useAppSelector(
//       selectCurrentCustomer,
//     );

//   const navItems = [
//     {
//       label: "Menu",
//       icon: House,
//       path: "/",
//       protected: false,
//     },
//     {
//       label: "Favorites",
//       icon: Heart,
//       path: "/favorites",
//       protected: true,
//     },
//     {
//       label: "Orders",
//       icon: Package,
//       path: "/orders",
//       protected: true,
//     },
//     {
//       label: "Profile",
//       icon: User,
//       path: "/profile",
//       protected: true,
//     },
//   ];

//   const handleNavigation = (
//     e: React.MouseEvent,
//     protectedRoute: boolean,
//     path: string,
//   ) => {
//     if (!protectedRoute) {
//       return;
//     }

//     if (customer) {
//       return;
//     }

//     e.preventDefault();

//     onRegisterClick();
//   };

//   return (
//     <nav
//       className="
//         fixed
//         bottom-5
//         left-1/2
//         z-50
//         w-[90%]
//         max-w-md
//         -translate-x-1/2
//         rounded-full
//         border
//         border-amber-900/30
//         bg-[#332016]
//         px-6
//         py-4
//         shadow-[0_8px_32px_rgba(0,0,0,0.6)]
//       "
//     >
//       <div className="mx-auto flex max-w-md justify-between">
//         {navItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               onClick={(e) =>
//                 handleNavigation(
//                   e,
//                   item.protected,
//                   item.path,
//                 )
//               }
//               className={({ isActive }) =>
//                 `flex flex-col items-center gap-1 ${
//                   isActive
//                     ? "text-amber-400"
//                     : "text-zinc-400"
//                 }`
//               }
//             >
//               <Icon size={20} />

//               <span className="text-xs">
//                 {item.label}
//               </span>
//             </NavLink>
//           );
//         })}
//       </div>
//     </nav>
//   );
// };

// export default CustomerBottomNavigation;

import {
  House,
  Heart,
  Package,
  User,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAppSelector } from "../../../../app/store/hooks";

import {
  selectCurrentCustomer,
} from "../../../../entities/customer/state/customerSelector";

type CustomerBottomNavigationProps = {
  onRegisterClick: () => void;
};

const CustomerBottomNavigation = ({
  onRegisterClick,
}: CustomerBottomNavigationProps) => {
  const navigate = useNavigate();

  const customer =
    useAppSelector(
      selectCurrentCustomer,
    );

  const navItems = [
    {
      label: "Menu",
      icon: House,
      path: "/",
      protected: false,
    },
    {
      label: "Favorites",
      icon: Heart,
      path: "/favorites",
      protected: true,
    },
    {
      label: "Orders",
      icon: Package,
      path: "/orders",
      protected: true,
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
      protected: true,
    },
  ];

  const handleNavigation = (
    e: React.MouseEvent,
    protectedRoute: boolean,
    path: string,
  ) => {
    if (!protectedRoute) {
      return;
    }

    if (customer) {
      return;
    }

    e.preventDefault();

    onRegisterClick();
  };

  return (
    <nav
      className="
        fixed
        bottom-5
        left-1/2
        z-50
        w-[90%]
        max-w-md
        -translate-x-1/2
        rounded-full
        border
        border-[var(--color-border-strong)]
        bg-[var(--color-surface)]/50
        px-4
        py-3
        shadow-[0_8px_32px_rgba(34,28,94,0.15)]
        backdrop-blur-xl
        backdrop-saturate-150
      "
    >
      <div className="mx-auto flex max-w-md items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={(e) =>
                handleNavigation(
                  e,
                  item.protected,
                  item.path,
                )
              }
              className={({ isActive }) =>
                `
                  flex
                  flex-col
                  items-center
                  gap-1
                  rounded-full
                  px-4
                  py-2
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-[var(--color-accent-tint-strong)] text-[var(--color-text-primary)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_2px_6px_rgba(34,28,94,0.12)]"
                      : "text-[var(--color-accent-soft)]"
                  }
                `
              }
            >
              <Icon size={20} />

              <span className="text-xs">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default CustomerBottomNavigation;