"use client";
import React from 'react';
import SessionMenu from '../SessionMenu';

export default function PastSession() {
  const menuItems = [
    { title: 'Current Sessions', path: '/teller/currentsession' },
    { title: 'Upcoming Sessions', path: '/teller/upcomingsession' }
  ];

  return (
    <div className="flex flex-col items-center h-screen pt-[76px]">
      <div className='flex flex-col items-center w-full h-full p-4 '>
      <SessionMenu 
        currentTitle="Past Sessions"
        menuItems={menuItems}
      />
      </div>
    </div>
  );
  }