"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import List from "./components/List";

interface Location {
	city: string;
}

interface DepartMent {
	title: string;
}

interface Function {
	title: string;
}

interface Job {
	title: string;
	location?: {
		city: string;
		state: string;
	};
	department: string;
	jobFunction: string;
}

export default function Home() {
	const [savedLocation, setSavedLocation] = useState<string | null>(null);
	const [location, setLocation] = useState<Location[]>([]);
	const [department, setDepartment] = useState<DepartMent[]>([]);
	const [func, setFunc] = useState<Function[]>([]);
	const [selectedCity, setSelectedCity] = useState<string>("");
	const [selectedDepartment, setSelectedDepartment] = useState<string>("");
	const [selectedFunc, setSelectedFunc] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [jobs, setJobs] = useState<Job[]>([]);
	const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const locationResponse = await fetch(
					"https://demo.jobsoid.com/api/v1/locations"
				);
				const locationData = await locationResponse.json();
				setLocation(locationData);
				const deptResponse = await fetch(
					"https://demo.jobsoid.com/api/v1/departments"
				);
				const deptData = await deptResponse.json();
				setDepartment(deptData);
				const funcResponse = await fetch(
					"https://demo.jobsoid.com/api/v1/functions"
				);
				const funcData = await funcResponse.json();
				setFunc(funcData);

				const jobsResponse = await fetch(
					"https://demo.jobsoid.com/api/v1/jobs"
				);
				const jobsData = await jobsResponse.json();
				setJobs(jobsData);
			} catch (error) {
				console.error("Error fetching Data: ", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		// Filter jobs based on selected values
		const filtered = jobs.filter((job) => {
			return (
				(!selectedCity || job.location.city === selectedCity) &&
				(!selectedDepartment || job.department.title === selectedDepartment) &&
				(!selectedFunc || job.function.title === selectedFunc)
			);
		});

		setFilteredJobs(filtered);
		// console.log("filteredJobs", filtered);
	}, [selectedCity, selectedDepartment, selectedFunc, jobs]);

	// useEffect(() => {
	// 	let saved = localStorage.getItem("city");
	// 	if (saved) {
	// 		setSavedLocation(saved);
	// 		console.log(savedLocation);
	// 	}
	// }, []);

	const handleLocationChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedValue = event.target.value;

		setSelectedCity(selectedValue);

		if (selectedValue) {
			localStorage.setItem("city", selectedValue);
		}
	};

	// useEffect(() => {
	// 	// console.log("selectedLocation", selectedLocation);
	// 	localStorage.setItem("city", selectedCity);
	// }, [selectedCity]);

	const handleDepartmentChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedDepartment(event.target.value);
	};

	const handleFuncChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedFunc(event.target.value);
	};

	useEffect(() => {
		setSearchText(`${selectedCity} ${selectedDepartment} ${selectedFunc}`);
	}, [selectedCity, selectedDepartment, selectedFunc]);

	const handleClearAll = () => {
		// Clear all selected values and input field
		setSelectedCity("");
		setSelectedDepartment("");
		setSelectedFunc("");
		setSearchText("");
	};
	return (
		<div className="w-full">
			<div className="px-10 bg-gray-400 py-4">
				<div className="flex">
					<input
						type="search"
						className="outline-none w-full px-4 text-base text-gray-400 h-14 relative"
						placeholder="Search for job"
						defaultValue={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<div className="absolute top-8 right-14">
						<CiSearch color="green" size={24} />
					</div>
				</div>
				<div className="py-5 flex flex-wrap gap-4">
					<select
						className="md:w-1/4 w-full h-10 outline-none text-base text-gray-400"
						value=""
						onChange={handleLocationChange}
					>
						<option disabled selected value="">
							Location
						</option>
						{location.map((item: Location, index) => {
							return (
								<option key={index} value={item.city}>
									{item.city}
								</option>
							);
						})}
					</select>
					<select
						className="md:w-1/4 w-full h-10 outline-none text-base text-gray-400"
						defaultValue={selectedDepartment}
						onChange={handleDepartmentChange}
					>
						<option disabled selected value="">
							Department
						</option>
						{department.map((item: DepartMent, index) => {
							return (
								<option key={index} value={item.title}>
									{item.title}
								</option>
							);
						})}
					</select>
					<select
						className="md:w-1/4 w-full h-10 outline-none text-base text-gray-400"
						defaultValue={selectedFunc}
						onChange={handleFuncChange}
					>
						<option disabled selected value="">
							Function
						</option>
						{func.map((item: Function, index) => {
							return (
								<option key={index} value={item.title}>
									{item.title}
								</option>
							);
						})}
					</select>
				</div>
				<div className="relative">
					<input
						type="text"
						className="w-full h-10 text-base text-gray-400 outline-none px-4 "
						defaultValue={searchText}
					/>
					<p
						className="text-green-600 text-base absolute top-2 right-4 cursor-pointer"
						onClick={handleClearAll}
					>
						Clear All
					</p>
				</div>
			</div>
			<List filteredJobs={filteredJobs} />
		</div>
	);
}
