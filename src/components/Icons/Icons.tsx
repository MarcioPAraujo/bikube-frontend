// https://react-icons.github.io/react-icons/icons/bs/
import React, { ElementType, FC } from 'react';
import Logo from '../../../public/images/BIKUBE_LOGO.svg';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';
import UserIcon from './UserIcon';
import { BsCaretRightFill } from 'react-icons/bs';
import { BsFileExcelFill } from 'react-icons/bs';
import { BsCaretDownFill } from 'react-icons/bs';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';

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
  OpenedEye: (props: IconProps) => <IconWrapper Icon={BsEye} color={props.color} size={props.size} />,
  ClosedEye: (props: IconProps) => <IconWrapper Icon={BsEyeSlash} {...props} />,
  PersonFillBlack: (props: IconProps) => <IconWrapper Icon={BsPersonFill} {...props} />,
  CaretRight: (props: IconProps) => <IconWrapper Icon={BsCaretRightFill} {...props} />,
  CloseIcon: (props: IconProps) => <IconWrapper Icon={BsFileExcelFill} {...props} />,
  CaretDown: (props: IconProps) => <IconWrapper Icon={BsCaretDownFill} {...props} />,
  SearchIcon: (props: IconProps) => <IconWrapper Icon={HiMiniMagnifyingGlass} {...props} />,
  Person: () => <IconWrapper Icon={UserIcon} />,
  Logo: () => <Logo />,
};
