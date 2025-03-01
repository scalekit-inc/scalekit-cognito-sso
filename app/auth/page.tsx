'use client';
export default function AuthPage() {
  return (
    <div>
      <button
        onClick={() => {
          fetch('/api/auth/login').then((res) => {
            window.location.href = res.url;
          });
        }}
      >
        Login
      </button>
    </div>
  );
}
