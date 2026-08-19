import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@snoomleng/ui';
import Form from 'next/form';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

const SearchForm = () => {
  return (
    <Form action="/search" className="flex gap-x-1 items-center">
      <InputGroup>
        <InputGroupInput placeholder="Search" type="text" name="search" />
        <InputGroupAddon>
          <HiMiniMagnifyingGlass />
        </InputGroupAddon>
      </InputGroup>

      <Button variant="default" className="shadow-none! translate-none!">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
