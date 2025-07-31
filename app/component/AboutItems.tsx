interface AboutItemProp {
  children?: React.ReactNode;
  title: string;
  date: string;
}

const AboutItem = ({ children, title, date }: AboutItemProp) => {
  return (
    <div className="shrink-0 flex my-3 items-center">
      {children || (
        <img
          src="https://cdn-icons-png.flaticon.com/512/5709/5709755.png"
          className="w-8 h-8"
        />
      )}
      <div className="mx-3 text-sm">
        <p className=" text-gray-500">{title}</p>
        <p className="">{date}</p>
      </div>
    </div>
  );
};
export default AboutItem;
