import { ReactNode } from 'react';
import InfoBoxTitle, { InfoBoxTitleType } from './InfoBoxTitle';

interface InfoBoxProps {
    icon: ReactNode;
    title: string;
    children?: ReactNode;
    linkTo?: string;
    type?: InfoBoxTitleType;
}

const InfoBox = ({icon, title, children, linkTo, type}: InfoBoxProps) => {
  return (
    <div className='flex p-1.5 w-fit max-w-full'>
        {icon}
        <div className='flex flex-col font-normal text-sm px-2.5'>
            <InfoBoxTitle linkTo={linkTo} type={type}>{title}</InfoBoxTitle>
            {children}
        </div>
    </div>
  )
}

export default InfoBox
