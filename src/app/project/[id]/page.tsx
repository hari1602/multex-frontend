"use client";
import Modal from "@/components/modal";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Project({ params }: { params: { id: string } }) {
  const router = useRouter();

  const name = useRef<HTMLInputElement | null>(null);
  const repoLink = useRef<HTMLInputElement | null>(null);
  const port = useRef<HTMLInputElement | null>(null);
  const dockerfileName = useRef<HTMLInputElement | null>(null);
  const dockerfileLocation = useRef<HTMLInputElement | null>(null);
  const repoBranch = useRef<HTMLInputElement | null>(null);

  const [repos, setRepos] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mainDomain, setMainDomain] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/repos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.current?.value,
        repoLink: repoLink.current?.value,
        port: port.current?.value,
        dockerfileName: dockerfileName.current?.value,
        dockerfileLocation: dockerfileLocation.current?.value,
        mainDomain: isChecked,
        projectId: params.id,
        url: isChecked ? mainDomain : null,
        repoBranch: repoBranch.current?.value,
      }),
    });

    const data = await response.json();

    if (data.status === 404) {
      alert(data.message);
    } else {
      alert(`Created ${data.name}!`);
      setIsOpen(false);
      setRepos((prev) => [...prev, data]);
    }
  };

  useEffect(() => {
    const response = async () => {
      const response = await fetch(
        `http://localhost:3000/projects/${params.id}`
      );
      const result = await response.json();
      setRepos(result.repos);
      setMainDomain(result.domain);
    };
    response();
  }, [params.id]);

  const ProjectModal = () => {
    return (
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <h1 className="mb-5">Link a Repository</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={name}
            name="floating_name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={repoLink}
            name="floating_repo_link"
            id="floating_repo_link"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repo_link"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Repo Link
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={port}
            name="floating_repo_port"
            id="floating_repo_port"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repo_port"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Port
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={dockerfileName}
            name="floating_dockerfile"
            id="floating_dockerfile"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            defaultValue={"Dockerfile"}
          />
          <label
            htmlFor="floating_dockerfile"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Docker file name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={dockerfileLocation}
            name="floating_dockerfile_location"
            id="floating_dockerfile_location"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            defaultValue={"."}
          />
          <label
            htmlFor="floating_dockerfile_location"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Docker file location
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            ref={repoBranch}
            name="floating_repoBranch"
            id="floating_repoBranch"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repoBranch"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Branch Source
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            name="floating_repoBranch"
            id="floating_repoBranch"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_repoBranch"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Data Source Port
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a data source</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
          </select>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Environment Variables
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="KEY='VALUE'"
          ></textarea>
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="custom_domain"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="domain"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {`Wish to link this repository to the main domain? (${mainDomain})?`}
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create
        </button>
      </form>
    );
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        + Link a Repository
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ProjectModal />
      </Modal>
      <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Domain
            </th>
            <th scope="col" className="px-6 py-3">
              Repo Link
            </th>
            <th scope="col" className="px-6 py-3">
              Port
            </th>
            <th scope="col" className="px-6 py-3">
              Dockerfile Name
            </th>
            <th scope="col" className="px-6 py-3">
              Dockerfile Location
            </th>
            <th scope="col" className="px-6 py-3">
              Branch Source
            </th>
          </tr>
        </thead>
        <tbody>
          {repos?.map(
            (project: {
              id: string;
              name: string;
              url: string;
              repoLink: string;
              port: string;
              dockerfileName: string;
              dockerfileLocation: string;
              repoBranch: string;
            }) => (
              <tr
                key={project.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {project.name}
                </th>
                <td className="px-6 py-4">
                  <Link
                    target="_blank"
                    href={`https://${project.url}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {project.url}
                  </Link>
                </td>
                <td className="px-6 py-4">{project.repoLink}</td>
                <td className="px-6 py-4">{project.port}</td>
                <td className="px-6 py-4">{project.dockerfileName}</td>
                <td className="px-6 py-4">{project.dockerfileLocation}</td>
                <td className="px-6 py-4">{project.repoBranch}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
