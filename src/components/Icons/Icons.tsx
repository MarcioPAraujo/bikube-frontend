// https://react-icons.github.io/react-icons/icons/bs/
import React, { ElementType, FC } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';
import { BsCaretRightFill } from 'react-icons/bs';
import { BsFileExcelFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { BsCalendar3 } from 'react-icons/bs';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { BsChevronDown } from 'react-icons/bs';
import { VscEyeClosed } from 'react-icons/vsc';
import { VscEye } from 'react-icons/vsc';
import { BsExclamationOctagonFill } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { PiTrashSimpleFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa6';
import { VscBellDot } from 'react-icons/vsc';
import { VscBell } from 'react-icons/vsc';
import { IoMdMail } from 'react-icons/io';
import { HiHome } from 'react-icons/hi2';
import { ImFileEmpty } from 'react-icons/im';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaHistory } from 'react-icons/fa';
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
  | 'Logo';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}
interface IconComponentProps extends IconProps {
  name: IconNames;
}

const iconMap: { [key in IconNames]: ElementType } = {
  ArrowLeft: BsArrowLeftCircle,
  OpenedEye: VscEye,
  ClosedEye: VscEyeClosed,
  PersonFillBlack: BsPersonFill,
  CaretRight: BsCaretRightFill,
  CloseIcon: BsFileExcelFill,
  CaretDown: BsCaretDownFill,
  SearchIcon: HiMiniMagnifyingGlass,
  Person: UserIcon,
  Calendar: BsCalendar3,
  ChevronDoubleRight: BsChevronDoubleRight,
  ChevronDoubleLeft: BsChevronDoubleLeft,
  ChevronDown: BsChevronDown,
  BsExclamationOctagonFill,
  MdKeyboardArrowDown,
  Trash: PiTrashSimpleFill,
  Check: FaCheck,
  NotificationOn: VscBellDot,
  NotificationOff: VscBell,
  Mail: IoMdMail,
  Home: HiHome,
  EmptyFile: ImFileEmpty,
  ArrowBack: FaArrowLeftLong,
  History: FaHistory,
  Logo,
};

export const Icon: FC<IconComponentProps> = ({ name, ...props }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.error(`Icon with name "${name}" not found.`);
    return null;
  }
  return <IconComponent {...props} />;
};
