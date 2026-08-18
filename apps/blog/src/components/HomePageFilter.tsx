'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@snoomleng/ui';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

export const HomePageFilter = (): React.JSX.Element => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('filter', value);
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Filtered by" />
        <SelectContent>
          <SelectGroup>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
};
