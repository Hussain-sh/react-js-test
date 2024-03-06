"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBuilding, FaLocationDot } from "react-icons/fa6";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";

interface Job {
	department?: {
		title: string;
	};
	function?: {
		title: string;
	};
	title?: string;
	location?: {
		city: string;
		state: string;
	};
	applyUrl?: string;
}

interface otherJobs {
	department?: {
		title: string;
	};
	function?: {
		title: string;
	};
	title?: string;
	location?: {
		city: string;
		state: string;
	};
}

const Job = () => {
	const [job, setJob] = useState<Job>({});
	const [otherJobs, setOtherJobs] = useState<otherJobs>({});
	const [loading, setLoading] = useState(true);
	const pathname = usePathname();
	const id = pathname.split("/").pop();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const jobDetailsResponse = await fetch(
					`https://demo.jobsoid.com/api/v1/jobs/${id}`
				);
				const jobDetails = await jobDetailsResponse.json();

				const otherJobsDetails = await fetch(
					"https://demo.jobsoid.com/api/v1/jobs"
				);
				const otherJobsData = await otherJobsDetails.json();

				// console.log(otherJobsData);
				setOtherJobs(otherJobsData);

				setJob(jobDetails);
				// console.log("otherJobs", otherJobs);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching job details:", error);
				setLoading(false);
			}
		};

		if (id) {
			fetchData();
		}
	}, [id]);

	return (
		<>
			{/* {console.log(otherJobs)} */}
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="w-full px-10 py-12">
					<div className="flex flex-col gap-4">
						<p className="text-lg font-semibold">
							{job.department?.title} department at Teknorix Systems Goa
						</p>
						<h3 className="text-2xl font-semibold">{job.title}</h3>
						<div className="flex flex-col gap-4 md:flex-row">
							<div className="flex gap-2">
								<FaBuilding size={20} />
								<p className="text-sm">{job.function?.title}</p>
							</div>
							<div className="flex gap-2">
								<FaLocationDot size={20} />
								<p className="text-sm">
									{job.location?.city}, {job.location?.state}
								</p>
							</div>
						</div>
						<div className="py-6">
							<Link href={job.applyUrl}>
								<button className="bg-blue-500 py-2 px-10 text-sm font-semibold rounded-full text-white">
									Apply
								</button>
							</Link>
						</div>
						<hr className="w-full border border-[#d9d9d9]" />
					</div>
					<div className="w-full flex flex-col gap-4 py-6 md:py-12 md:flex-row">
						<div className="w-full md:w-3/5">
							<div
								className="text-base"
								dangerouslySetInnerHTML={{
									__html: job.description,
								}}
							/>
						</div>
						<div className="w-full md:w-2/5 px-4 flex flex-col gap-6">
							<div className="w-full bg-blue-200 p-4 flex flex-col gap-4 justify-start">
								<h3 className="text-base font-semibold uppercase">
									Other Job Openings
								</h3>
								<hr className="border-2 w-20 border-blue-500" />
								{otherJobs.map((item, index) => {
									return (
										<>
											<div className="py-2 flex flex-col gap-4">
												<p className="text-sm font-semibold capitalize">
													{item.title}
												</p>
												<div className="flex flex-col gap-4 md:flex-row">
													<div className="flex gap-2">
														<FaBuilding size={20} />
														<p className="text-sm">{item.industry}</p>
													</div>
													<div className="flex gap-2">
														<FaLocationDot size={20} />
														<p className="text-sm">
															{item.location?.city}, {item.location?.state}
														</p>
													</div>
												</div>
											</div>
										</>
									);
								})}
							</div>
							<div className="w-full p-4 flex flex-col gap-3 justify-start">
								<h3 className="text-base font-semibold uppercase">
									Share Job Openings
								</h3>
								<hr className="border-2 w-20 border-blue-500" />
								<div className="flex gap-4">
									<div className="w-10 h-10 border-2 border-black rounded-full flex justify-center items-center">
										<Link href="https://www.facebook.com/">
											<FaFacebookSquare size={20} />
										</Link>
									</div>
									<div className="w-10 h-10 border-2 border-black rounded-full flex justify-center items-center">
										<Link href="https://www.linkedin.com/home">
											<FaLinkedin size={20} />
										</Link>
									</div>
									<div className="w-10 h-10 border-2 border-black rounded-full flex justify-center items-center">
										<Link href="https://twitter.com/?lang=en">
											<FaTwitter size={20} />
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Job;
