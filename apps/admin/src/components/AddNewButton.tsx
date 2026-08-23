import { Button } from '@snoomleng/ui';
import Link from 'next/link';
import React from 'react';
import { GoPlus } from 'react-icons/go';

const AddNewButton = ({ href }: { href: string }): React.JSX.Element => {
  return (
    <Button
      className="shadow-none! translate-none! group text-background"
      asChild
    >
      <Link href={href}>
        <span className="group-hover:rotate-360 duration-200 transition-all">
          <GoPlus className="font-semibold size-5" />
        </span>
        <span>Add New</span>
      </Link>
    </Button>
  );
};

export default AddNewButton;
