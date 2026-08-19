import { sanityFetch } from '@/sanity/live';
import { ALL_PROJECTS_QUERY, PROJECT_QUERY } from '@/sanity/query';
import {
  Bounded,
  PortableTextBlock,
  PortableTextRenderer,
  ProjectDetailTable,
  ProjectLink,
  SectionTitle,
} from '@snoomleng/ui';
import { SlugParamsProps } from '@snoomleng/utils';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const getProject = async ({ params }: SlugParamsProps) => {
  const { data } = await sanityFetch({
    query: PROJECT_QUERY,
    params: await params,
  });

  return data;
};

export async function generateMetadata({
  params,
}: SlugParamsProps): Promise<Metadata> {
  const data = await getProject({ params });

  if (!data) return notFound();

  const { seo, name } = data;

  return {
    title: seo?.metaTitle || name,
    description: seo?.metaDescription,
    openGraph: seo?.imageUrl ? { images: [seo.imageUrl] } : undefined,
  };
}

export async function generateStaticParams() {
  const { data: projects } = await sanityFetch({
    query: ALL_PROJECTS_QUERY,
    perspective: 'published',
    stega: false,
  });

  return projects.map((p) => ({
    slug: p.slug,
  }));
}

const ProjectDetailPage = async ({ params }: SlugParamsProps) => {
  const project = await getProject({ params });

  if (!project) return notFound();

  const { body, startedAt, endedAt, links, name, stacks, type } = project;

  return (
    <Bounded spacing="lg">
      <Link href="/projects" className="my-3 group flex gap-x-2 items-center">
        <FaArrowLeft className="group-hover:-translate-x-2 duration-200 transition-transform ease-in-out" />
        <span className="group-hover:underline underline-offset-4 decoration-wavy decoration-primary">
          Back to All Projects
        </span>
      </Link>

      <div className="grid gap-y-6 md:gap-x-4 md:grid-cols-[auto_1fr]">
        <div className="flex flex-col gap-y-2">
          {links && (
            <ProjectDetailTable
              name={name || ''}
              type={type || ''}
              startedAt={startedAt || ''}
              endedAt={endedAt || ''}
            />
          )}

          <div className="flex gap-x-2 items-center">
            {links &&
              links.map((l) => (
                <ProjectLink
                  key={l._key}
                  label={l.label || ''}
                  href={l.url || ''}
                />
              ))}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <SectionTitle as="h2" label="Technologies" size="sm" />

          <div className="flex gap-2 flex-wrap">
            {stacks &&
              stacks.map((stack) => (
                <p key={stack} className="px-2 py-1 border text-fs-300">
                  {stack}
                </p>
              ))}
          </div>
        </div>
      </div>

      {body && <PortableTextRenderer value={body as PortableTextBlock[]} />}
    </Bounded>
  );
};

export default ProjectDetailPage;
