// import { useState } from "react";
// import MenuTabs, { type MenuTab } from "@/features/admin/menu/MenuTabs";
// import ProductsPanel from "./ProductsPanel";
// import CategoriesPanel from "./CategoriesPanel";

// const MenuManager = () => {
//   const [tab, setTab] = useState<MenuTab>("products");

//   return (
//     <div className="flex flex-col gap-5">
//       <MenuTabs value={tab} onChange={setTab} />
//       {tab === "products" ? <ProductsPanel /> : <CategoriesPanel />}
//     </div>
//   );
// };

// export default MenuManager;

import { useState } from "react";
import MenuTabs, { type MenuTab } from "@/features/admin/menu/MenuTabs";
import ProductsPanel from "./ProductsPanel";
import CategoriesPanel from "./CategoriesPanel";
import HighlightsPanel from "./HighlightsPanel";

const MenuManager = () => {
  const [tab, setTab] = useState<MenuTab>("products");

  return (
    <div className="flex flex-col gap-5">
      <MenuTabs value={tab} onChange={setTab} />
      {tab === "products" && <ProductsPanel />}
      {tab === "categories" && <CategoriesPanel />}
      {tab === "highlights" && <HighlightsPanel />}
    </div>
  );
};

export default MenuManager;
