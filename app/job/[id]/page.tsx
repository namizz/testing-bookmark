"use client";
import React from "react";
import CategoryItem from "../../component/CategoryItem";
import Box from "../../component/Boxes";
import data from "../../../public/data.json";
import AboutItem from "@/app/component/AboutItems";
import Candidate from "@/app/component/Candidate";
import ResponsiblitiesItem from "@/app/component/ResponsiblityList";
import Link from "next/link";
import { useGetJobByIdQuery } from "@/app/redux/api";
import { use } from "react";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaHourglassEnd,
  FaArrowLeft,
} from "react-icons/fa";
import { LuMapPin } from "react-icons/lu";

interface JobDetailProps {
  params: Promise<{ id: string }>;
}
const JobDetail = ({ params }: JobDetailProps) => {
  const id = use(params);
  console.log(id?.id);
  const { data, isLoading, isError } = useGetJobByIdQuery(id.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading jobs...</p>
      </div>
    );
  }

   if (isError) {
    console.error("Error fetching jobs:");
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Something went wrong. Please try again later.
        </p>
      </div>
    );
  }
   if (!data.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Job is not Found.
        </p>
      </div>
    );
  }
  
  const description = data.data.description;
  const respo = data.data.responsibilities.split('.')
  .map(sentence => sentence.trim())
  .filter(sentence => sentence.length > 0)
  .map(sentence => sentence + '.');
  const age = data.data.age;
  const gender = data.data.gender;
  const candidate = data.data.idealCandidate;
  const postedOn = data.data.datePosted.split("T")[0];
  const deadline = data.data.deadline.split("T")[0]; //
  const location = data.data.location;
  const startDate = data.data.startDate.split("T")[0];
  const endDate = data.data.endDate.split("T")[0];
  const categories = data.data.categories; //
  const skills = data.data.requiredSkills;
  const when = data.data.whenAndWhere;

  const tagColors = [
    "bg-green-50 text-green-500",
    "bg-yellow-50 text-yellow-500",
    "bg-pink-50 text-pink-700",
    "bg-purple-50 text-purple-900",
    "bg-red-50 text-red-500",
    "bg-emerald-50 text-emerald-900",
    "bg-sky-50 text-sky-600",
    "bg-orange-50 text-orange-500",
    "bg-teal-50 text-teal-700",
    "bg-lime-50 text-lime-800",
  ];

  return (
    <div className="py-10">
      <div className="  flex justify-around max-w-[1300px] mx-auto px-4">
        <div className="pr-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <FaArrowLeft className="text-gray-700" />
          </Link>
        </div>
        <div className=" w-[70%]">
          <Box title="Description">
            <p>
              {description ||
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae repellat enim, quasi quod officia ullam accusamus eveniet sapiente odio quidem nam, illo ipsa repellendus laudantium earum incidunt nisi laboriosam dolorum."}
            </p>
          </Box>
          <Box title="Responsibilities">
            {respo.map((r,i)=><ResponsiblitiesItem key ={i} >{r}</ResponsiblitiesItem>)}
            
          </Box>
          <Box title="Ideal Candidate we want">
            <ul className="list-disc pl-5">
              {(gender?.toLowerCase() == "male" ||
                gender?.toLowerCase() == "female") && (
                <Candidate> {gender} Only</Candidate>
              )}
              {age && (
                <Candidate>
                  <span className="font-bold">Age:</span> {age}
                </Candidate>
              )}

              <Candidate>{candidate}</Candidate>
            </ul>
          </Box>
          <Box title="When & Where">
            <div className="flex gap-2">
              <LuMapPin className="w-5 h-5 text-blue-400" />
              <p>
                The onboading event for this event will take place in Jan 18th
                in {when || "AAU Auditorium"}{" "}
              </p>
            </div>
          </Box>
        </div>
        <div className=" px-10">
          <Box title="About">
            <AboutItem title="Posted On" date={postedOn}>
              <FaCalendarAlt className="w-5 h-5 text-blue-400" />
            </AboutItem>
            <AboutItem title="Deadline" date={deadline}>
              <FaHourglassEnd className="w-5 h-5 text-blue-400" />
            </AboutItem>
            <AboutItem title="Location" date={location}>
              <FaMapMarkerAlt className="w-5 h-5 text-blue-400" />
            </AboutItem>
            <AboutItem title="Start Date" date={startDate}>
              <FaRegCalendarPlus className="w-5 h-5 text-blue-500" />
            </AboutItem>
            <AboutItem title="End Date" date={endDate}>
              <FaRegCalendarCheck className="w-5 h-5 text-blue-500" />
            </AboutItem>
          </Box>

          <Box title="Categories">
            {categories.map((c, i) => (
              <CategoryItem
                key={i}
                name={c}
                className={`text-md ${
                  tagColors[Math.floor(Math.random() * tagColors.length)]
                }`}
              />
            ))}
          </Box>
          <Box title="Required Skills">
            {skills.map((s, i) => (
              <CategoryItem
                key={i}
                name={s}
                className="bg-indigo-50 text-indigo-900 rounded-lg"
              />
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
