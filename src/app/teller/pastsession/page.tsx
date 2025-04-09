"use client";
import React from 'react';
import SessionMenu from '../SessionMenu';
import SessionBox from '../SessionBox';
import SearchBar from '../../browseTeller/SearchBar';
import SearchFilter from '../../browseTeller/SearchFilter';
import SearchSort from '../../browseTeller/SearchSort';

export default function PastSession() {
  const menuItems = [
    { title: 'Current Sessions', path: '/teller/currentsession' },
    { title: 'Upcoming Sessions', path: '/teller/upcomingsession' }
  ];
  const [searchQuery, setSearchQuery] = React.useState("");
  const sessions = [
    {
      name: "Mekk Maedhus",
      detail: "You made 180 baht",
      date: "23 Mar 2025",
      time: "13:00",
    },
    {
      name: "John Smith",
      detail: "You made 360 baht",
      date: "23 Mar 2025",
      time: "14:30",
    },
    {
      name: "Sarah Wilson",
      detail: "You made 380 baht",
      date: "23 Mar 2025",
      time: "15:45",
    }
  ];

  return (
    <div className="flex flex-col items-center h-screen pt-[76px]">
      <div className='flex flex-col items-center w-full h-full p-4 gap-5 '>
        <SessionMenu
          currentTitle="Past Sessions"
          menuItems={menuItems}
        />
        <div className="flex flex-row items-center justify-between w-full">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <SearchFilter />
          <SearchSort />
        </div>

        <div className='flex flex-col items-center w-full h-full gap-3'>
          {sessions.map((session, index) => (
            <SessionBox
              key={index}
              name={session.name}
              detail={session.detail}
              date={session.date}
              time={session.time}
              past={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
  }