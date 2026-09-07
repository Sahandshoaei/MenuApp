import { useParams } from "react-router-dom";
import { useMenu } from "../../entities/menu/hooks/useMenu";
import CategoryPageHeader from "../../features/customer/category/CategoryPageHeader";
import CategoryItemCarousel from "../../widgets/customer/category/ui/CategoryItemCarousel";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { getCategory } = useMenu();

  const category = categoryId ? getCategory(categoryId) : undefined;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] px-5 pt-6 pb-10">
      <CategoryPageHeader title={category?.title ?? categoryId ?? ""} />
      <CategoryItemCarousel />
    </div>
  );
};

export default CategoryPage;
