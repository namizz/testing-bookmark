interface CategoryItemProps {
  name?: string;
  className?: string;
}
const CategoryItem = ({ name, className }: CategoryItemProps) => {
  return (
    <div
      className={`inline-block rounded-full p-2 mx-0.5 my-1 text-sm ${className}`}
    >
      <p className="">{name || "Business Marketing"}</p>
    </div>
  );
};

export default CategoryItem;
