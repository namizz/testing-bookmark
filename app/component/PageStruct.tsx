import React from "react";

interface Pageprops {
  title: string;
  children: React.ReactNode;
}

const PageStruct = ({ title, children }: Pageprops) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="text-sm w-90">
        <h1 className="text-2xl font-extrabold text-center text-gray-700">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default PageStruct;
