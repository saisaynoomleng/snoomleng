import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@snoomleng/ui';
import Image from 'next/image';
import clsx from 'clsx';

import { CiSettings } from 'react-icons/ci';
import { MdCategory, MdOutlineViewQuilt } from 'react-icons/md';
import { GiFiles, GiNewspaper, GiStairsGoal, GiSuitcase } from 'react-icons/gi';
import { FaLaptopCode, FaLinux } from 'react-icons/fa';
import Link from 'next/link';
import { BsMailboxFlag } from 'react-icons/bs';

const OPERATION_LINKS = [
  { name: 'Page Heroes', url: '/heroes', icon: <MdOutlineViewQuilt /> },
  { name: 'About Me', url: '/about', icon: <GiStairsGoal /> },
  { name: 'Tech Stacks', url: '/technologies', icon: <FaLinux /> },
  { name: 'Projects', url: '/projects', icon: <GiFiles /> },
  { name: 'Employment Histories', url: '/employments', icon: <GiSuitcase /> },
  { name: 'Contacts', url: '/contacts', icon: <BsMailboxFlag /> },
];

const MARKETING_LINKS = [
  { name: 'Blog Categories', url: '/categories', icon: <MdCategory /> },
  { name: 'Focus', url: '/focus', icon: <FaLaptopCode /> },
  { name: 'Blogs', url: '/blogs', icon: <GiNewspaper /> },
];

export const SidebarNav = (): React.JSX.Element => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <Image width={100} height={100} src={''} alt="" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operation</SidebarGroupLabel>

          <SidebarMenu>
            {OPERATION_LINKS.map((l) => (
              <SidebarMenuItem key={l.url}>
                <SidebarMenuButton asChild>
                  <Link
                    href={l.url}

                    className={clsx('')}
                  >
                    <span>{l.icon}</span>
                    <span>{l.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Marketing</SidebarGroupLabel>

          <SidebarMenu>
            {MARKETING_LINKS.map((l) => (
              <SidebarMenuItem key={l.url}>
                <SidebarMenuButton asChild>
                  <Link href={l.url}>
                    <span>{l.icon}</span>
                    <span>{l.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <span>
                  <CiSettings />
                </span>
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
