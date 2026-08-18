import React from 'react';
import { Bounded, SectionTitle } from '../shared';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#components/ui/table';
import { Card, CardContent } from '#components/ui/card';

import { CiSettings } from 'react-icons/ci';
import {
  MdCategory,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineViewQuilt,
} from 'react-icons/md';
import { GiFiles, GiNewspaper, GiStairsGoal, GiSuitcase } from 'react-icons/gi';
import { FaLinux } from 'react-icons/fa';
import {
  SiBetterauth,
  SiClerk,
  SiDocker,
  SiDrizzle,
  SiExpress,
  SiGithub,
  SiGsap,
  SiLinux,
  SiNeon,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiReact,
  SiReacthookform,
  SiSanity,
  SiShadcnui,
  SiStorybook,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiVim,
  SiVitest,
  SiZod,
  SiRedis,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoIosArrowRoundDown } from 'react-icons/io';
import { RiHotelLine } from 'react-icons/ri';
import { MdHealthAndSafety } from 'react-icons/md';
import { PiShoppingBagFill } from 'react-icons/pi';
import { BsSuitcaseLgFill } from 'react-icons/bs';
import {
  FaGolang,
  FaLaptopCode,
  FaNode,
  FaStripe,
  FaStripeS,
} from 'react-icons/fa6';

const icons = [
  <MdHealthAndSafety />,
  <PiShoppingBagFill />,
  <BsSuitcaseLgFill />,
  <CiSettings />,
  <MdOutlineViewQuilt />,
  <GiFiles />,
  <GiStairsGoal />,
  <GiSuitcase />,
  <FaLinux />,
  <SiBetterauth />,
  <SiClerk />,
  <SiDocker />,
  <SiDrizzle />,
  <SiExpress />,
  <SiGithub />,
  <SiGsap />,
  <SiLinux />,
  <SiNeon />,
  <SiNextdotjs />,
  <SiNginx />,
  <SiPostgresql />,
  <SiReact />,
  <SiReacthookform />,
  <SiSanity />,
  <SiShadcnui />,
  <SiStorybook />,
  <SiTailwindcss />,
  <SiTanstack />,
  <SiTypescript />,
  <SiVim />,
  <SiVitest />,
  <SiZod />,
  <FaAws />,
  <RxHamburgerMenu />,
  <IoIosArrowRoundDown />,
  <RiHotelLine />,
  <FaStripe />,
  <SiRedis />,
  <FaNode />,
  <FaGolang />,
  <GiNewspaper />,
  <MdCategory />,
  <FaLaptopCode />,
  <MdKeyboardDoubleArrowLeft />,
  <MdKeyboardDoubleArrowRight />,
];

const fontSizes = {
  900: { rem: '4.5rem', px: '72px' },
  800: { rem: '3.75rem', px: '60px' },
  700: { rem: '3rem', px: '48px' },
  600: { rem: '2.25rem', px: '36px' },
  500: { rem: '1.5rem', px: '24px' },
  400: { rem: '1rem', px: '16px' },
  300: { rem: '0.875rem', px: '14px' },
  200: { rem: '0.5rem', px: '8px' },
};

export const Typography = (): React.JSX.Element => {
  return (
    <Bounded size="full" spacing="lg">
      <div className="space-y-4">
        <SectionTitle label="Typography" size="md" />
        <p>
          Typography establishes hierarchy, improves readability, and creates a
          consistent visual language across the interface. Our type scale is
          designed to balance clarity and personality, with each style serving a
          specific role within the system.
        </p>
        <p>
          From expressive display styles to compact labels and captions,
          typography adapts across layouts while maintaining consistent spacing,
          weight, and rhythm.
        </p>
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3" label="Typefaces" />

        <div className="grid grid-cols-2 justify-between gap-x-6">
          <div className="grid grid-cols-2 font-heading bg-brand-primary-200 p-6 items-center border-2 border-border">
            <p className="text-fs-600">Aa</p>
            <p className="font-extrabold">Josefin Slab</p>
          </div>

          <div className="grid grid-cols-2 font-body bg-brand-primary-200 p-6 items-center border-2 border-border">
            <p className="text-fs-600">Aa</p>
            <p className="font-semibold">Open Sans</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SectionTitle as="h3" label="Font Sizes" />

        <Table>
          <TableCaption>Different font sizes</TableCaption>
          <TableHeader>
            <TableRow className="uppercase font-bold">
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Pixels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(fontSizes).map(([title, values]) => (
              <TableRow key={title}>
                <TableCell>{title}</TableCell>
                {Object.values(values).map((v, i) => (
                  <TableCell key={i}>{v}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <SectionTitle as="h3" label="Iconography" />
          <p>
            Icons provide a simple and recognizable visual language for
            communicating actions, navigation, status, and supporting
            information. The system uses icons from React Icons to maintain a
            consistent visual style across the interface.
          </p>

          <p>
            Icons should be clear, purposeful, and appropriately scaled to their
            surrounding content. They complement typography and UI elements
            without competing with the primary message.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-wrap gap-2">
            {icons.map((icon, i) => (
              <span key={i} className="text-fs-600 p-1 border border-border/10">
                {icon}
              </span>
            ))}
          </CardContent>
        </Card>
      </div>
    </Bounded>
  );
};
