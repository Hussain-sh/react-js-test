import React from "react";
import { FaBuilding, FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

const List = ({ filteredJobs }) => {
	return (
		<>
			{filteredJobs &&
				filteredJobs.map((item, index) => {
					return (
						<div key={index}>
							<div className="w-full px-10 py-12">
								<div className="flex flex-col gap-4">
									{item.department && (
										<div>
											<h3 className="text-xl font-bold md:text-4xl">
												{item.department?.title}
											</h3>
											<hr className="border-2 w-20 border-blue-500" />
										</div>
									)}

									<div className="flex justify-between items-center py-4">
										<div className="py-4 flex flex-col gap-2 w-1/2">
											<p className="text-sm font-semibold md:text-lg">
												{item?.title}
											</p>
											<div className="flex flex-col gap-4 md:flex-row">
												<div className="flex gap-2">
													<FaBuilding size={20} />
													<p className="text-sm">{item.function?.title}</p>
												</div>
												<div className="flex gap-2">
													<FaLocationDot size={20} />
													<p className="text-sm">
														{item.location?.city}, {item.location?.state}
													</p>
												</div>
												<div className="w-20 h-6 px-1 py-1 text-xs bg-gray-400 uppercase text-center font-semibold">
													Full time
												</div>
											</div>
										</div>
										<div className="w-1/2 py-4 flex gap-4 justify-end">
											<Link href={item.applyUrl}>
												<button className="bg-transparent border border-blue-500 py-2 px-2 text-sm text-blue-500 rounded-full">
													Apply
												</button>
											</Link>
											<Link href={`jobs/${item.id}`}>
												<button className="bg-transparent border border-gray-500 py-2 px-2 text-sm text-gray-500 rounded-full">
													View
												</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
							<hr className="w-full border border-[#d9d9d9]" />
						</div>
					);
				})}
		</>
	);
};

export default List;
