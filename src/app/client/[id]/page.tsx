"use client";
import Modal from "@/components/modal";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

export default function Client({ params }: { params: { id: string } }) {
  const router = useRouter();
  const name = useRef<HTMLInputElement | null>(null);
  const description = useRef<HTMLInputElement | null>(null);
  const domain = useRef<HTMLInputElement | null>(null);

  const [projects, setProjects] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("https://backend.blvhn.online/projects", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.current?.value,
        domain: domain.current?.value,
        customDomain: isChecked,
        clientId: params.id,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === 404) {
      alert(data.message);
    } else {
      alert(`Created ${data.name}!`);
      setIsOpen(false);
      setProjects((prev) => [...prev, data]);
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    const response = async () => {
      const response = await fetch(
        `https://backend.blvhn.online/clients/${params.id}`
      );
      const result = await response.json();
      setProjects(result.projects);
    };
    response();
  }, [params.id]);

  const ProjectModal = () => {
    return (
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <h1 className="mb-5">Add a project</h1>
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
            ref={description}
            name="floating_description"
            id="floating_description"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Description
          </label>
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
            htmlFor="custom_domain"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Prefer custom domain?
          </label>
        </div>
        {isChecked && (
          <div className="relative z-0 w-full mb-5 group">
            <input
              ref={domain}
              name="floating_domain"
              id="floating_domain"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_domain"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Domain
            </label>
          </div>
        )}
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
        + Add Project
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
              PREVIEW LINK
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Tenant Invitation Link
            </th>
          </tr>
        </thead>
        <tbody>
          {projects?.map(
            (project: { id: string; name: string; domain: string }) => (
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
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {project.domain}
                </td>
                <td className="px-6 py-4">
                  <Link
                    target="_blank"
                    href={`https://preview.${project.domain}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    preview.{project.domain}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/project/${project.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View Repositories
                  </Link>
                  {" | "}
                  <Link
                    href={`/tenant/${project.id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View Tenants
                  </Link>
                </td>
                <td className="flex items-center px-6 py-4">
                  <Link
                    target="_blank"
                    href={`https://signup.blvhn.online/${project.id}`}
                    className=" font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <span className="mr-4">
                      signup.blvhn.online/{project.id}
                    </span>
                  </Link>
                  <button
                    onClick={async () =>
                      await handleCopy(
                        `https://signup.blvhn.online/${project.id}`
                      )
                    }
                    className="
                      flex items-center
                      px-2 py-2
                      bg-blue-600
                      text-white
                      rounded
                      hover:bg-blue-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  >
                    <ClipboardDocumentIcon className="w-5 h-5 mx-2" />
                  </button>
                  {copied && (
                    <span className="ml-4 text-green-600">Copied!</span>
                  )}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
