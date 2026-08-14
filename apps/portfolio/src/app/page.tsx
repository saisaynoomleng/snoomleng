import { RenderAction } from '@/components/RenderAction';
import { RenderMedia } from '@/components/RenderMedia';
import { sanityFetch } from '@/sanity/live';
import { MAIN_HERO_QUERY } from '@/sanity/query';
import { Bounded, CTA, Hero, PortableTextBlock } from '@snoomleng/ui';

export default async function Home() {
  const { data: hero } = await sanityFetch({ query: MAIN_HERO_QUERY });

  if (!hero) return <>Loading...</>;

  return (
    <Bounded>
      <Hero
        title={hero.title || ''}
        body={hero.body as PortableTextBlock[]}
        actions={hero.actions as CTA[]}
        media={{ src: hero.imageUrl || '', alt: hero.imageAlt || '' }}
        position={hero.position || []}
        renderAction={(props) => RenderAction({ props })}
        renderMedia={(props) => RenderMedia({ props })}
      />
    </Bounded>
  );
}
