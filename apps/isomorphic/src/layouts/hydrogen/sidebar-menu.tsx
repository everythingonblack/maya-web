'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Title } from 'rizzui/typography';
import { Collapse } from 'rizzui/collapse';
import cn from '@core/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import { menuItems } from '@/layouts/hydrogen/menu-items';
import StatusBadge from '@core/components/get-status-badge';

// --- Fungsi Helper Baru ---
// Fungsi ini secara rekursif memeriksa apakah path saat ini
// ada di dalam item dropdown (termasuk yang nested)
function isPathActive(items: any[], path: string): boolean {
  if (!items) return false;
  return items.some((item) => {
    if (item.href === path) return true;
    // Pengecekan rekursif
    if (item.dropdownItems) {
      return isPathActive(item.dropdownItems, path);
    }
    return false;
  });
}

// --- Komponen Rekursif Baru ---
// Komponen ini akan merender Link (jika item terakhir)
// atau Collapse baru (jika memiliki nested dropdown)
function DropdownItem({ item, pathname }: { item: any; pathname: string }) {
  const hasNestedDropdown = item.dropdownItems && item.dropdownItems.length > 0;

  // Cek apakah item ini aktif, atau salah satu anaknya aktif
  const isParentActive =
    item.href === pathname ||
    (hasNestedDropdown && isPathActive(item.dropdownItems, pathname));

  // --- KASUS DASAR: Render Link (tidak ada nested dropdown) ---
  if (!hasNestedDropdown) {
    const isChildActive = pathname === (item?.href as string);
    return (
      <Link
        href={item?.href}
        className={cn(
          'mx-3.5 mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
          isChildActive
            ? 'text-primary'
            : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
        )}
      >
        <div className="flex items-center truncate">
          <span
            className={cn(
              'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
              isChildActive
                ? 'bg-primary ring-[1px] ring-primary'
                : 'opacity-40'
            )}
          />{' '}
          <span className="truncate">{item.name}</span>
        </div>
        {item?.badge?.length ? <StatusBadge status={item?.badge} /> : null}
      </Link>
    );
  }

  // --- LANGKAH REKURSIF: Render Collapse (ada nested dropdown) ---
  const isDropdownOpen = isPathActive(item.dropdownItems, pathname);

  return (
    <Collapse
      defaultOpen={isDropdownOpen}
      header={({ open, toggle }) => (
        <div
          onClick={toggle}
          className={cn(
            'mx-3.5 mb-0.5 flex cursor-pointer items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2 2xl:mx-5',
            isParentActive // Highlight header jika item atau anaknya aktif
              ? 'text-primary'
              : 'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
          )}
        >
          <div className="flex items-center truncate">
            <span
              className={cn(
                'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                isParentActive
                  ? 'bg-primary ring-[1px] ring-primary'
                  : 'opacity-40'
              )}
            />
            <span className="truncate">{item.name}</span>
          </div>
          <PiCaretDownBold
            strokeWidth={3}
            className={cn(
              'h-3.5 w-3.5 text-gray-500 transition-transform duration-200',
              open ? 'rotate-0' : '-rotate-90 rtl:rotate-90'
            )}
          />
        </div>
      )}
    >
      {/* Tambahkan padding untuk indentasi item nested */}
      <div className="ps-3">
        {item.dropdownItems.map((nestedItem: any, index: number) => (
          // Panggil dirinya sendiri secara rekursif
          <DropdownItem
            key={nestedItem.name + '-' + index}
            item={nestedItem}
            pathname={pathname}
          />
        ))}
      </div>
    </Collapse>
  );
}

// --- Komponen Utama (Sudah Dimodifikasi) ---
export function SidebarMenu() {
  const pathname = usePathname();

  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems.map((item, index) => {
        const isActive = pathname === (item?.href as string);

        // **MODIFIKASI 1:** Gunakan helper isPathActive untuk nested check
        const isDropdownOpen = item?.dropdownItems
          ? isPathActive(item.dropdownItems, pathname)
          : false;

        return (
          <Fragment key={item.name + '-' + index}>
            {item?.href ? (
              <>
                {item?.dropdownItems ? (
                  <Collapse
                    defaultOpen={isDropdownOpen}
                    header={({ open, toggle }) => (
                      <div
                        onClick={toggle}
                        className={cn(
                          'group relative mx-3 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:mx-5 2xl:my-2',
                          isDropdownOpen // Logika ini sekarang benar untuk nested
                            ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                            : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                        )}
                      >
                        <span className="flex items-center">
                          {item?.icon && (
                            <span
                              className={cn(
                                'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                isDropdownOpen
                                  ? 'text-primary'
                                  : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                              )}
                            >
                              {item?.icon}
                            </span>
                          )}
                          {item.name}
                        </span>

                        <PiCaretDownBold
                          strokeWidth={3}
                          className={cn(
                            'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                            open && 'rotate-0 rtl:rotate-0'
                          )}
                        />
                      </div>
                    )}
                  >
                    {/* **MODIFIKASI 2:** Ganti map <Link> dengan komponen rekursif <DropdownItem> */}
                    {item?.dropdownItems?.map((dropdownItem, index) => {
                      return (
                        <DropdownItem
                          key={dropdownItem?.name + index}
                          item={dropdownItem}
                          pathname={pathname}
                        />
                      );
                    })}
                  </Collapse>
                ) : (
                  // (Tidak berubah) Render Link level atas
                  <Link
                    href={item?.href}
                    className={cn(
                      'group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2',
                      isActive
                        ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                        : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                    )}
                  >
                    <div className="flex items-center truncate">
                      {item?.icon && (
                        <span
                          className={cn(
                            'me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5',
                            isActive
                              ? 'text-primary'
                              : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                          )}
                        >
                          {item?.icon}
                        </span>
                      )}
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item?.badge?.length ? (
                      <StatusBadge status={item?.badge} />
                    ) : null}
                  </Link>
                )}
              </>
            ) : (
              // (Tidak berubah) Render Title
              <Title
                as="h6"
                className={cn(
                  'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8',
                  index !== 0 && 'mt-6 3xl:mt-7'
                )}
              >
                {item.name}
              </Title>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}