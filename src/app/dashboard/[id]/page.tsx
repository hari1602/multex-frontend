"use client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useEffect } from "react";

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTenantActivityData() {
  return {
    labels: ["Alpha Corp", "Beta Ltd", "Gamma Solutions"],
    datasets: [
      {
        label: "API Calls",
        data: [
          getRandomInt(50, 200),
          getRandomInt(50, 200),
          getRandomInt(50, 200),
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "User Logins",
        data: [
          getRandomInt(50, 150),
          getRandomInt(50, 150),
          getRandomInt(50, 150),
        ],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };
}

export default function Dashboard({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/clients/${params.id}`
      );
      const result = await response.json();
      setProjects(result.projects);
      setSelectedProject(result.projects[0].name);
    };
    fetchData();
  }, [params.id]);

  const metrics = {
    errorRate: "0.5%",
    responseTime: "200ms",
    storageUsage: "50GB",
    databaseMetrics: {
      queriesPerSecond: 150,
      connections: 20,
    },
  };

  const tenantActivityData = generateRandomTenantActivityData();

  function handleProjectChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedProject(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="mt-6">
        <label
          htmlFor="project-select"
          className="block text-gray-700 dark:text-gray-300"
        >
          Select Project:
        </label>
        <select
          id="project-select"
          value={selectedProject || ""}
          onChange={handleProjectChange}
          className="mt-2 p-2 border border-gray-400 dark:border-gray-600 rounded-md 
               bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 
               focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {projects.map((project) => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Tenant Activity
          </h2>
          <Bar data={tenantActivityData} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
          <ul className="mt-4 text-gray-700 dark:text-gray-300">
            <li>New tenant sign-up: Delta Inc</li>
            <li>Project update: Beta Ltd added a new repository</li>
            <li>New tenant sign-up: Epsilon LLC</li>
          </ul>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Metrics
        </h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Error Rate
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {metrics.errorRate}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Response Time
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {metrics.responseTime}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Storage Usage
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {metrics.storageUsage}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Database Metrics
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Queries per Second: {metrics.databaseMetrics.queriesPerSecond}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Connections: {metrics.databaseMetrics.connections}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => router.push(`/client/${params.id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Project
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Invite Team
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
