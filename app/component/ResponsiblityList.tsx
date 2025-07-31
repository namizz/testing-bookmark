import { BsCheckCircle } from "react-icons/bs";
interface RespoProps {
  children: React.ReactNode;
}

const ResponsiblitiesItem = ({ children }: RespoProps) => {
  return (
    <div className="flex items-center m-1">
      <BsCheckCircle className="w-4 h-4 text-green-500 shrink-0" />
      <p className="mx-2 my-1.25">{children}</p>
    </div>
  );
};

export default ResponsiblitiesItem;
