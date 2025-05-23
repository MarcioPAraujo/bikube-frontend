// https://react-icons.github.io/react-icons/icons/bs/
import React, { ElementType } from 'react';
import Logo from '../../../public/images/BIKUBE_LOGO.svg';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';

interface IconProps {
  size?: number;
  color?: string;
}

const IconWrapper = ({ size = 24, color, Icon }: { Icon: ElementType; size?: number; color?: string }) => (
  <Icon size={size} color={color} />
);
export const Icons = {
  ArrowLeft: (props: IconProps) => <IconWrapper Icon={BsArrowLeftCircle} {...props} />,
  OpenedEye: (props: IconProps) => <IconWrapper Icon={BsEye} color={props.color} size={props.size} />,
  ClosedEye: (props: IconProps) => <IconWrapper Icon={BsEyeSlash} {...props} />,
  Logo: () => <Logo />,
};
