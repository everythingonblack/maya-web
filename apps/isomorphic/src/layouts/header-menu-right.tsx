'use client';

import { Badge, ActionIcon } from 'rizzui';
import MessagesDropdown from '@/layouts/messages-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/layouts/settings-button';
import RingBellSolidIcon from '@core/components/icons/ring-bell-solid';
import ChatSolidIcon from '@core/components/icons/chat-solid';
import NotificationDropdown from './notification-dropdown';
import DropdownAction from '@core/components/charts/dropdown-action';
import { useSelectedOption } from '@/hooks/use-selected-option'; // Import the custom hook

export default function HeaderMenuRight() {
  const { selectedOption, setSelectedOption } = useSelectedOption(); // Use the custom hook

  const overAllProgressViewOptions = [
    { label: '1 Day', value: '1d' },
    { label: '7 Days', value: '7d' },
    { label: '30 Days', value: '30d' },
  ];

  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      {/* Dropdown untuk overAllProgressViewOptions */}
      <DropdownAction
        className="h-[34px] shadow backdrop-blur-md rounded-md border max-w-[120px]"
        options={overAllProgressViewOptions}
        onChange={(value) => setSelectedOption(value)}
        dropdownClassName="!z-[9999]"
      />

      {/* Messages */}
      <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className="relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9"
        >
          <ChatSolidIcon className="h-[18px] w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-2.5 top-2.5 -translate-y-1/3 translate-x-1/2"
          />
        </ActionIcon>
      </MessagesDropdown>

      {/* Settings */}
      <SettingsButton />

      {/* Profile Menu */}
      <ProfileMenu />
    </div>
  );
}
