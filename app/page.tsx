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
              <pre className="overflow-auto text-sm whitespace-pre-wrap max-h-60">
                <code className="block text-left">
                  {Object.entries(userInfo || {}).map(([key, value]) => (
                    <div key={key} className="mb-1">
                      <span className="text-blue-600 font-semibold">{key}</span>
                      <span className="text-gray-600">: </span>
                      <span className="text-green-600">
                        {typeof value === 'object'
                          ? JSON.stringify(value)
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </code>
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
            <form action="/auth/login" className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </CenteredLayout>
  );
}
