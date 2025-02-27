"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Tenant({ params }: { params: { id: string } }) {
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    const response = async () => {
      const response = await fetch(
        `https://backend.blvhn.online/tenants/proj/${params.id}`
      );
      const result = await response.json();
      setTenants(result);
    };
    response();
  }, [params.id]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Domain
            </th>
          </tr>
        </thead>
        <tbody>
          {tenants?.map(
            (tenant: { id: string; name: string; domain: string }) => (
              <tr
                key={tenant.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {tenant.name}
                </th>
                <td className="px-6 py-4">
                  <Link
                    target="_blank"
                    href={`https://${tenant.domain}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {tenant.domain}
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
