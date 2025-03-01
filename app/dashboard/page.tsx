import { getUserInfo } from '@/lib/auth';
import Link from 'next/link';

export default async function Dashboard() {
  const userInfo = await getUserInfo();

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-auto">
            {JSON.stringify(userInfo, null, 2)}
          </pre>
        </div>

        <div className="flex justify-between">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Home
          </Link>
          <Link
            href="/auth/logout"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}
