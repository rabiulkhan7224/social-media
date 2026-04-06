'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import SignInForm from '@/components/sign-in-form';
import Loader from '@/components/loader';

const HomePage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to feed if user is authenticated
    if (!isLoading && user) {
      router.push('/feed');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600 mx-auto"></div>
          <Loader />
        </div>
      </div>
    );
  }

  // Show sign-in form if not authenticated
  if (!user) {
    return (
      <div className="">
        <SignInForm />
      </div>
    );
  }

  // Return null while redirecting (or a redirecting message)
  return null;
};

export default HomePage;