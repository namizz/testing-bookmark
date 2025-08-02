"use client";
import { useGetJobsQuery } from "./redux/api";
import Card from "./component/Card";
import Box from "./component/Boxes";

import { signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsBookmarkFill } from "react-icons/bs";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, isLoading, isError } = useGetJobsQuery();
  console.log("session", session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  console.log(data?.data);
  // const jobs = data.job_postings;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    );
  }

  // Show error state
  if (isError) {
    console.error("Error fetching jobs");
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end gap-3 p-4">
        <button
          data-cy="nav-bookmarks"
          className="flex gap-2 items-center rounded-2xl border p-1 border-gray-200"
          onClick={() => redirect("/bookmark")}
        >
          <BsBookmarkFill color="gold" />
          <p className="text-sm">BookMarks</p>
        </button>
        <div className="text-center">
          <p className="text-xs">{session.user?.data.name}</p>
          <button
            className="border p-1 rounded-2xl bg-red-400 text-white"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <Box title="Opportunities" className="py-0 my-0">
          <p className="text-gray-400 mb-6">Show {data.data.length} result</p>
          {data.data.map((job, index) => (
            <Card
              key={job.id}
              id={job.id}
              image={job.logoUrl}
              title={job.title}
              description={job.description}
              location={job.location}
              company={job.orgName}
              categories={job.categories}
              type={job.opType}
              mark={job.isBookmarked}
            />
          ))}
        </Box>
      </div>
    </div>
  );
}
