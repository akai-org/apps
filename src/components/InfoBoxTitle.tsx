import React, { ReactNode } from 'react'

export enum InfoBoxTitleType {
    TEXT,
    LINK
}

interface InfoBoxTitleProps {
    type?: InfoBoxTitleType;
    linkTo?: string;
    children: ReactNode
}

const InfoBoxTitle = ({type = InfoBoxTitleType.TEXT, linkTo, children}: InfoBoxTitleProps) => {
    return (
        <>
            {
                type == InfoBoxTitleType.LINK ? 
                    <a className='font-semibold text-base text-blue-400 underline' href={linkTo}>{children}</a>
                    : 
                    <span className='font-semibold text-base'>{children}</span>
            }
        </>
        
    )
}

export default InfoBoxTitle
