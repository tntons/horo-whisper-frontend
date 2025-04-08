"use client"
import React from 'react';
import SessionMenu from '../SessionMenu';

export default function CurrentSession() {
  const menuItems = [
    { title: 'Past Sessions', path: '/teller/pastsession' },
    { title: 'Upcoming Sessions', path: '/teller/upcomingsession' }
  ];

  return (
    <div className="flex flex-col items-center h-screen p-[76px]">
      <SessionMenu 
        currentTitle="Current Sessions"
        menuItems={menuItems}
      />
    </div>
  );
}