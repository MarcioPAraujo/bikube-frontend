// https://react-icons.github.io/react-icons/icons/bs/
import React, { ElementType, FC } from 'react';
import Logo from '../../../public/images/BIKUBE_LOGO.svg';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';
import UserIcon from './UserIcon';
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

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}
interface IconWrapperProps {
  Icon: ElementType;
  size?: number;
  color?: string;
  className?: string;
}
const IconWrapper: FC<IconWrapperProps> = ({ size = 24, color, Icon, className }) => (
  <Icon size={size} color={color} className={className} />
);
export const Icons = {
  ArrowLeft: (props: IconProps) => <IconWrapper Icon={BsArrowLeftCircle} {...props} />,
  OpenedEye: (props: IconProps) => <IconWrapper Icon={VscEye} color={props.color} size={props.size} />,
  ClosedEye: (props: IconProps) => <IconWrapper Icon={VscEyeClosed} {...props} />,
  PersonFillBlack: (props: IconProps) => <IconWrapper Icon={BsPersonFill} {...props} />,
  CaretRight: (props: IconProps) => <IconWrapper Icon={BsCaretRightFill} {...props} />,
  CloseIcon: (props: IconProps) => <IconWrapper Icon={BsFileExcelFill} {...props} />,
  CaretDown: (props: IconProps) => <IconWrapper Icon={BsCaretDownFill} {...props} />,
  SearchIcon: (props: IconProps) => <IconWrapper Icon={HiMiniMagnifyingGlass} {...props} />,
  Person: () => <IconWrapper Icon={UserIcon} />,
  Calendar: (props: IconProps) => <IconWrapper Icon={BsCalendar3} {...props} />,
  ChevronDoubleRight: (props: IconProps) => <IconWrapper Icon={BsChevronDoubleRight} {...props} />,
  ChevronDoubleLeft: (props: IconProps) => <IconWrapper Icon={BsChevronDoubleLeft} {...props} />,
  ChevronDown: (props: IconProps) => <IconWrapper Icon={BsChevronDown} {...props} />,
  BsExclamationOctagonFill: (props: IconProps) => <IconWrapper Icon={BsExclamationOctagonFill} {...props} />,
  MdKeyboardArrowDown: (props: IconProps) => <IconWrapper Icon={MdKeyboardArrowDown} {...props} />,
  Logo: () => <Logo />,
};
