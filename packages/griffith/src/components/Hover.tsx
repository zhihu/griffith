import React from 'react'
import useBoolean from '../hooks/useBoolean'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: (isHover: boolean) => React.ReactElement
}

const Hover: React.FC<Props> = ({
  children,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  const [isHovered, isHoveredSwitch] = useBoolean()

  return (
    <div
      {...rest}
      onMouseEnter={(e) => {
        isHoveredSwitch.on()
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        isHoveredSwitch.off()
        onMouseLeave?.(e)
      }}
    >
      {children(isHovered)}
    </div>
  )
}

export default Hover
