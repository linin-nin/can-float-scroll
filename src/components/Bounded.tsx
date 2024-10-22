import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react'

interface Props {
    as?: ElementType;
    className?: string,
    children: ReactNode
}
const Bounded = ({
    as: Comp = "section",
    children,
    className,
    ...restProps
}: Props) => {
  return (
    <Comp 
    className={clsx("px-4 first:pt-10 md:px-6", className)}
    {...restProps}
    >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
            {children}
        </div>
    </Comp>
  )
}

export default Bounded