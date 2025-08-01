"use client";
import { useGetJobsQuery } from "../redux/api";
import Card from "../component/Card";
import Box from "../component/Boxes";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { data, isLoading, isError } = useGetJobsQuery();
  //   console.log(session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  //   console.log(data?.data);
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
      <div>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
        >
          <FaArrowLeft className="text-gray-700" />
        </Link>
      </div>
      <div className="flex justify-center">
        <Box title="Opportunities" className="py-0 my-0">
          {data.data.map(
            (job, index) =>
              job.isBookmarked && (
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
              )
          )}
        </Box>
      </div>
    </div>
  );
}
