import "whatwg-fetch";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Bookmark from "../component/BookMarkButt";

const createBookmarkMock = jest.fn(() => ({
  unwrap: jest.fn().mockResolvedValue({}),
}));
const deleteBookmarkMock = jest.fn(() => ({
  unwrap: jest.fn().mockResolvedValue({}),
}));

jest.mock("../redux/bookmark.api", () => ({
  useCreateBookmarkMutation: () => [createBookmarkMock],
  useDeleteBookmarkMutation: () => [deleteBookmarkMock],
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { data: { accessToken: "fake-token" } } },
    status: "authenticated",
  }),
}));

describe("BookmarkButton", () => {
  const eventId = "12345";

  test("calls createBookmark API on click when not bookmarked", () => {
    render(
      <Provider store={store}>
        <Bookmark id={eventId} marked={false} />
      </Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(createBookmarkMock).toHaveBeenCalled();
  });

  test("calls deleteBookmark API on click when already bookmarked", () => {
    render(
      <Provider store={store}>
        <Bookmark id={eventId} marked={true} />
      </Provider>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(deleteBookmarkMock).toHaveBeenCalled();
  });
});
