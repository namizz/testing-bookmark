import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
  useCreateBookmarkMutation,
  useDeleteBookmarkMutation,
} from "../redux/bookmark.api";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface BookmarkProps {
  id?: string;
  marked: boolean;
}

const Bookmark = ({ id, marked }: BookmarkProps) => {
  const [createBookmark] = useCreateBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();
  const [isBookmarked, setIsBookmarked] = useState(marked);

  const ToggleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("clicked", id);

    try {
      if (marked) {
        await deleteBookmark(id).unwrap();
        setIsBookmarked(false);
      } else {
        await createBookmark(id).unwrap();
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Bookmark toggle error", error);
    }
  };
  return (
    <button onClick={ToggleBookmark}>
      {marked ? (
        <BsBookmarkFill color="gold" className="border z-10" size={24} />
      ) : (
        <BsBookmark color="gray" size={24} className="border z-10" />
      )}
    </button>
  );
};
export default Bookmark;
