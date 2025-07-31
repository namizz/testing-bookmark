interface BoxProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
const Box = ({ title, children, className }: BoxProps) => {
  return (
    <div>
      <h2 className={`text-2xl font-extrabold my-3 text-gray-700 ${className}`}>
        {title || "Description"}
      </h2>
      {children}
    </div>
  );
};
export default Box;
