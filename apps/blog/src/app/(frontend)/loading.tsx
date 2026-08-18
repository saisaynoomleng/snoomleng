import { Bounded, Skeleton } from '@snoomleng/ui';

export default function Loading() {
  return (
    <Bounded className="grid gap-8 md:grid-cols-4">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton key={i} className="h-100 w-full" />
      ))}
    </Bounded>
  );
}
