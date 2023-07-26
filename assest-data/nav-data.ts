import { PiTextT } from 'react-icons/pi';
import { RxSpaceBetweenHorizontally } from 'react-icons/rx';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { BiLogoBlogger } from 'react-icons/bi';
import { RiSlideshowFill } from 'react-icons/ri';
import { SiFreelancer } from 'react-icons/si';

export const navItems = [
  {
    to: 'TYPE',
    icon: PiTextT,
    href: '/type',
    id: require('crypto').randomBytes(64).toString('hex'),
  },
  {
    to: 'SPACE',
    icon: RxSpaceBetweenHorizontally,
    href: '/space',
    id: require('crypto').randomBytes(64).toString('hex'),
  },
  {
    to: 'GRID',
    icon: BsGrid1X2Fill,
    href: '/grid',
    id: require('crypto').randomBytes(64).toString('hex'),
  },
  {
    to: 'BLOG',
    icon: BiLogoBlogger,
    href: '/blog',
    id: require('crypto').randomBytes(64).toString('hex'),
  },
  {
    to: 'SHOWCASE',
    icon: RiSlideshowFill,
    href: '/showcase',
    id: require('crypto').randomBytes(64).toString('hex'),
  },
  {
    to: 'UTILS',
    icon: SiFreelancer,
    href: '/utils',
    id: require('crypto').randomBytes(64).toString('hex'),
  },
];
