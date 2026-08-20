import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@snoomleng/ui';
import Form from 'next/form';
import React from 'react';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const SearchForm = ({
  setOpen,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Form action="/search" className="flex gap-x-1 items-center">
      <InputGroup>
        <InputGroupInput placeholder="Search" type="text" name="search" />
        <InputGroupAddon>
          <HiMiniMagnifyingGlass />
        </InputGroupAddon>
      </InputGroup>

      <Button
        variant="default"
        className="shadow-none! translate-none!"
        onClick={() => setOpen?.(false)}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
