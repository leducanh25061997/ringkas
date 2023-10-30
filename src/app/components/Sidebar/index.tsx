import styled from 'styled-components';

import logo from 'assets/icons/logo.svg';

import SidebarMenu from './SidebarMenu';
import React from 'react';
import useOnClickOutside from 'app/hooks/useOnClickOutside';
import { menuButtonRef } from '../Navbar';

const RingkasLogo = styled.img`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
`;
const ScrollBar = styled.div`
  overflow-y: auto;
  width: 100%;
  padding-inline: 24px;
`;
export const sidebarRef = React.createRef<HTMLDivElement>();

export default function Sidebar() {
  useOnClickOutside(sidebarRef, handleCloseSidebar, menuButtonRef);

  function handleCloseSidebar() {
    if (!sidebarRef.current) return;
    if (!sidebarRef.current.classList.contains('hidden'))
      sidebarRef.current.classList.add('hidden');
  }

  return (
    <div
      className="text-[#8d96b0] fixed top-0 bottom-0 left-0 w-[260px] z-40 bg-white py-10 shadow-[1px_0px_4px_rgba(0,0,0,0.05)] hidden 2xl:flex 2xl:flex-col"
      ref={sidebarRef}
    >
      <RingkasLogo src={logo} width={112} height={32} alt="" />
      <ScrollBar className="scrollbar">
        <SidebarMenu />
      </ScrollBar>
    </div>
  );
}
