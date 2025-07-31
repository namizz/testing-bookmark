import CategoryItem from "./CategoryItem";
import Link from "next/link";
interface cardProps {
  id?: string;
  title?: string;
  company?: string;
  location?: string;
  description?: string;
  categories?: string[];
  type?: string;
  image?: string;
}
const Card = ({
  id,
  title,
  company,
  location,
  description,
  categories,
  type,
  image,
}: cardProps) => {
  const colr = [
    "border-yellow-500 text-yellow-500",
    "border-red-500 text-red-500",
    "border-green-500 text-green-500",
    "border-blue-500 text-blue-500",
    "border-indigo-500 text-indigo-500",
    "border-purple-500 text-purple-500",
    "border-orange-500 text-orange-500",
    "border-sky-500 text-sky-500",
  ];
  return (
    <Link href={`/job/${id}`}>
      <div className="shadow-md border border-[#00000010] flex w-[900] rounded-3xl px-8 py-4 m-1">
        <div className=" mx-3 shrink-0">
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={
              image ||
              "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
            alt="comany image"
          />
        </div>
        <div className=" px-8">
          <h2 className="text-2xl font-semibold inline-block">
            {title || "Social Media Assistant"}
          </h2>
          <p className=" my-3 text-gray-400">
            {company || " Young Men Chiristian Association"} -
            <span> {location || "Addis Ababa, Ethiopia"}</span>
          </p>
          <p className="mb-3">
            {description ||
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, repellendus dolorum libero ea repellat quis vero officia architecto modi enim unde molestiae in eveniet maiores excepturi ratione quisquam? Iste, aperiam?"}
          </p>
          <div className="flex ">
            <CategoryItem
              name={type || "REmote"}
              className="bg-green-50 text-green-500"
            />{" "}
            <span className="text-3xl font-light text-gray-300 mx-1">|</span>
            {categories?.map((category, index) => (
              <CategoryItem
                key={String(index)}
                name={category}
                className={`border ${
                  colr[Math.floor(Math.random() * colr.length)]
                }`}
              />
            )) || <CategoryItem />}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
