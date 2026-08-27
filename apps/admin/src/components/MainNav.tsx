'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from '@snoomleng/ui';
import { formatTitle } from '@snoomleng/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const MainNav = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const loggedIn = session !== null;

  return (
    <nav className="flex justify-between items-center py-4 shadow-md p-2">
      <div className="font-semibold text-fs-500">
        {loggedIn ? (
          <div className="flex gap-x-2">
            <span className="text-primary">
              Welcome, {formatTitle(session.user.name)}
            </span>
          </div>
        ) : (
          <span className="text-primary">Welcome to Admin!</span>
        )}
      </div>

      {loggedIn ? (
        <div className="flex gap-x-2 items-center">
          <div className="relative aspect-square w-10">
            <Image
              src={
                session.user.image ??
                `https://placehold.co/100?text=${session.user.name.slice(0, 1).toUpperCase()}`
              }
              alt="user photo"
              fill
              priority
              sizes="(max-width: 50px) 55vw, 33vw"
              className="rounded-full w-full object-cover"
              unoptimized
            />
          </div>
          <Button
            variant="toolbar"
            onClick={() =>
              authClient.signOut({}, { onSuccess: () => router.refresh() })
            }
            className="cursor-pointer"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Button variant="toolbar">
          <Link href="/sign-in">Sign In</Link>
        </Button>
      )}
    </nav>
  );
};
