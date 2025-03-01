import Link from 'next/link';
import CenteredLayout from '@/components/CenteredLayout';
import { getUserInfo } from '@/lib/auth';

export default async function Home() {
  // Check authentication status
  const userInfo = await getUserInfo();
  const isAuthenticated = userInfo !== null;

  return (
    <CenteredLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Amazon Cognito User Pool Demo</h1>

        {isAuthenticated ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Welcome, {userInfo?.username || 'User'}
            </h2>
            <p>Here are some attributes you can use as a developer:</p>
            <div className="bg-gray-100 p-4 rounded-md">
              <pre className="overflow-auto text-sm">
                {JSON.stringify(userInfo, null, 4)}
              </pre>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/dashboard"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/auth/logout"
                className="inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-600">Please log in to continue</p>
            <Link
              href="/auth/login"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </CenteredLayout>
  );
}
