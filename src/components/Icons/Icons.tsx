// https://react-icons.github.io/react-icons/icons/bs/
import React, { ElementType, FC } from 'react';
// Bootstrap Icons
import {
  BsArrowLeftCircle,
  BsPersonFill,
  BsCaretRightFill,
  BsFileExcelFill,
  BsCaretDownFill,
  BsCalendar3,
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsChevronDown,
  BsExclamationOctagonFill,
} from 'react-icons/bs';
// VSCode Icons
import { VscEyeClosed, VscEye, VscBellDot, VscBell } from 'react-icons/vsc';
// Material Design Icons
import { MdKeyboardArrowDown } from 'react-icons/md';
// Phosphor Icons
import { PiTrashSimpleFill } from 'react-icons/pi';
// FontAwesome 6 Icons
import { FaCheck, FaArrowLeftLong } from 'react-icons/fa6';
// FontAwesome Icons
import { FaHistory, FaBriefcase } from 'react-icons/fa';
// Ionicons
import { IoMdMail } from 'react-icons/io';
// Heroicons
import { HiMiniMagnifyingGlass, HiHome } from 'react-icons/hi2';
// IcoMoon
import { ImFileEmpty } from 'react-icons/im';
// Grommet Icons
import { GrLogout } from 'react-icons/gr';
// Local Icons
import UserIcon from './UserIcon';
import Logo from '../../../public/images/BIKUBE_LOGO.svg';

type IconNames =
  | 'ArrowLeft'
  | 'OpenedEye'
  | 'ClosedEye'
  | 'PersonFillBlack'
  | 'CaretRight'
  | 'CloseIcon'
  | 'CaretDown'
  | 'SearchIcon'
  | 'Person'
  | 'Calendar'
  | 'ChevronDoubleRight'
  | 'ChevronDoubleLeft'
  | 'ChevronDown'
  | 'BsExclamationOctagonFill'
  | 'MdKeyboardArrowDown'
  | 'Trash'
  | 'Check'
  | 'NotificationOn'
  | 'NotificationOff'
  | 'Mail'
  | 'Home'
  | 'EmptyFile'
  | 'ArrowBack'
  | 'History'
  | 'Logout'
  | 'Briefcase'
  | 'Logo';

interface IconComponentProps {
  size?: number;
  color?: string;
  className?: string;
  name: IconNames;
}

const iconMap: { [key in IconNames]: ElementType } = {
  ArrowBack: FaArrowLeftLong,
  ArrowLeft: BsArrowLeftCircle,
  Briefcase: FaBriefcase,
  BsExclamationOctagonFill,
  Calendar: BsCalendar3,
  CaretRight: BsCaretRightFill,
  CaretDown: BsCaretDownFill,
  Check: FaCheck,
  ClosedEye: VscEyeClosed,
  CloseIcon: BsFileExcelFill,
  ChevronDoubleRight: BsChevronDoubleRight,
  ChevronDoubleLeft: BsChevronDoubleLeft,
  ChevronDown: BsChevronDown,
  EmptyFile: ImFileEmpty,
  History: FaHistory,
  Home: HiHome,
  Logout: GrLogout,
  Logo,
  MdKeyboardArrowDown,
  Mail: IoMdMail,
  NotificationOn: VscBellDot,
  NotificationOff: VscBell,
  OpenedEye: VscEye,
  Person: UserIcon,
  PersonFillBlack: BsPersonFill,
  SearchIcon: HiMiniMagnifyingGlass,
  Trash: PiTrashSimpleFill,
};

export const Icon: FC<IconComponentProps> = ({ name, size = 24, ...props }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.error(`Icon with name "${name}" not found.`);
    return null;
  }
  return <IconComponent {...props} size={size} />;
};
