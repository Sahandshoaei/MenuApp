import TablesStats from "./TablesStats";
import TableGrid from "./TableGrid";

const TablesManager = () => {
  return (
    <div className="flex flex-col gap-6">
      <TablesStats />
      <TableGrid />
    </div>
  );
};

export default TablesManager;
