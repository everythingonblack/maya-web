import { DUMMY_ID } from '@/config/constants';
import { routes } from '@/config/routes';
import { drop } from 'lodash';
import { Agent } from 'node:http';
import {
  PiAirplaneTiltDuotone,
  PiApplePodcastsLogoDuotone,
  PiArrowsOutDuotone,
  PiArrowsOutLineHorizontalDuotone,
  PiBellSimpleRingingDuotone,
  PiBinocularsDuotone,
  PiBriefcaseDuotone,
  PiBrowserDuotone,
  PiCalendarDuotone,
  PiCalendarPlusDuotone,
  PiCaretCircleUpDownDuotone,
  PiChartBarDuotone,
  PiChartLineUpDuotone,
  PiChartPieSliceDuotone,
  PiChatCenteredDotsDuotone,
  PiClipboardTextDuotone,
  PiCodesandboxLogoDuotone,
  PiCoinDuotone,
  PiCreditCardDuotone,
  PiCurrencyCircleDollarDuotone,
  PiCurrencyDollarDuotone,
  PiEnvelopeDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiFeatherDuotone,
  PiFolderDuotone,
  PiFolderLockDuotone,
  PiFoldersDuotone,
  PiFolderUserDuotone,
  PiGridFourDuotone,
  PiHammerDuotone,
  PiHeadsetDuotone,
  PiHourglassSimpleDuotone,
  PiHouseLineDuotone,
  PiListNumbersDuotone,
  PiLockKeyDuotone,
  PiMapPinLineDuotone,
  PiNewspaperClippingDuotone,
  PiNoteBlankDuotone,
  PiPackageDuotone,
  PiPresentationChartDuotone,
  PiPushPinDuotone,
  PiRocketLaunchDuotone,
  PiScalesDuotone,
  PiShapesDuotone,
  PiShieldCheckDuotone,
  PiShootingStarDuotone,
  PiShoppingCartDuotone,
  PiSparkleDuotone,
  PiSquaresFourDuotone,
  PiStairsDuotone,
  PiStepsDuotone,
  PiTableDuotone,
  PiUserCircleDuotone,
  PiUserDuotone,
  PiUserGearDuotone,
  PiUserPlusDuotone,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Dashboard',
    href: '/maya-cs',
    icon: <PiFolderDuotone />,
  },

  // label end
  {
    name: 'Profesi',
    href: '/maya-cs',
    icon: <PiFolderDuotone />,
    dropdownItems: [
      // label end
      {
        name: 'Mayagen CS',
        href: '#',
        icon: <PiShoppingCartDuotone />,
        dropdownItems: [
          {
            name: 'Agent Config',
            href: routes.mayaCS.config,
            badge: '',
          },
          {
            name: 'AI Knowledge',
            href: routes.mayaCS.knowledge,
          },
          {
            name: 'Playground',
            href: routes.mayaCS.playground,
            icon: <PiBriefcaseDuotone />,
          },
          {
            name: 'Maya Avatar',
            href: routes.mayaCS.avatar,
            icon: <PiClipboardTextDuotone />,
          },
        ],
      },
      // label end
      {
        name: 'Mayagen Marketing',
        href: '#',
        icon: <PiShoppingCartDuotone />,
        dropdownItems: [
          {
            name: 'Agent Config',
            href: routes.mayaCS.config,
            badge: '',
          },
          {
            name: 'AI Knowledge',
            href: routes.mayaCS.knowledge,
          },
          {
            name: 'Playground',
            href: routes.mayaCS.playground,
            icon: <PiBriefcaseDuotone />,
          },
          {
            name: 'Maya Avatar',
            href: routes.mayaCS.avatar,
            icon: <PiClipboardTextDuotone />,
          },
        ],
      },
    ]
  },
];
