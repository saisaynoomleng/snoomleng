import { Bounded, Button } from '@snoomleng/ui';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = (): React.JSX.Element => {
  return (
    <Bounded className="grid md:grid-cols-2 place-items-center min-h-dvh">
      <div className="flex flex-col gap-y-4 brand-box-shadow border-2 p-3">
        <p className="text-[10rem] font-bold leading-none">
          <span className="text-primary">4</span>
          <span className="text-brand-secondary-600">0</span>
          <span className="text-primary">4</span>
        </p>
        <div className="bg-brand-error-900 rounded-sm">
          <p className="font-semibold text-center text-fs-600 rounded-full text-background">
            ERROR
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="shadow-none! border-primary border-4"
        >
          <Link href="/">Back to Home Page</Link>
        </Button>
      </div>
      <div className="overflow-hidden w-100 relative aspect-square animate-brand-rotate">
        <Image
          src="/spaceship.png"
          fill
          sizes="(max-width: 500px) 100vw, 66vw"
          alt="spaceship"
          className="min-w-full "
          priority
        />
      </div>
    </Bounded>
  );
};

export default NotFoundPage;
