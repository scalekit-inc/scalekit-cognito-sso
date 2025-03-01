'use client';
import Link from 'next/link';
import CenteredLayout from '@/components/CenteredLayout';

export default function AuthPage() {
  const handleLogin = () => {
    fetch('/auth/login').then((res) => {
      window.location.href = res.url;
    });
  };

  return (
    <CenteredLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Amazon Cognito User Pool Demo</h1>
        <p className="text-gray-600">
          Please log in to access this application.
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login with Amazon Cognito
          </button>

          <Link
            href="/"
            className="px-4 py-2 text-center bg-gray-200 rounded hover:bg-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </CenteredLayout>
  );
}
