import { sanityFetch } from '@/sanity/live';
import { TECH_STACK_QUERY } from '@/sanity/query';
import { Bounded, SectionTitle, Separator } from '@snoomleng/ui';
import {
  formatTitle,
  replaceDashWithSpace,
  TechStackFormInputSchema,
} from '@snoomleng/utils';
import { notFound } from 'next/navigation';
import React from 'react';
import { EditForm } from './EditForm';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

type StackType = TechStackFormInputSchema['type'];

const PreviewTechnology = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.JSX.Element> => {
  const { data: stack } = await sanityFetch({
    query: TECH_STACK_QUERY,
    params: await params,
  });

  if (!stack) notFound();

  const techStack: TechStackFormInputSchema = {
    name: stack.name || '',
    slug: stack.slug || '',
    iconText: stack.icon || '',
    type: stack.type as unknown as StackType,
  };

  return (
    <Bounded size="full" centered={false} spacing="sm">
      <Link href="/technologies" className="link-url flex items-center gap-x-2">
        <span>
          <FaArrowLeft />
        </span>
        <span>Back to All TechStack</span>
      </Link>

      <SectionTitle size="sm" label={stack.name as string} />

      <div className="flex flex-col gap-y-4">
        <p>
          <span>Name: </span>
          <span className="font-semibold">{stack.name}</span>
        </p>
        <p>
          <span>Icon Text: </span>
          <span className="font-semibold">{stack.icon}</span>
        </p>
        {stack.type && (
          <p>
            <span>Type: </span>
            <span className="font-semibold">
              {replaceDashWithSpace(formatTitle(stack.type))}
            </span>
          </p>
        )}
      </div>

      <Separator />

      <div className="flex gap-y-4 flex-col">
        <SectionTitle as="h3" label="Edit Tech Stack" />

        <EditForm
          techStack={techStack}
          _id={stack._id as string}
          slug={stack.slug as string}
        />
      </div>
    </Bounded>
  );
};

export default PreviewTechnology;
