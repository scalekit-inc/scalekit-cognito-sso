import Link from 'next/link';
import CenteredLayout from '@/components/CenteredLayout';

export default function Home() {
  return (
    <CenteredLayout>
      <p className="text-3xl font-semibold">
        This is example of cognito with scalekit
      </p>

      <Link
        href="/auth"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        See an example of users landing on your auth page
      </Link>
    </CenteredLayout>
  );
}
