import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Tooltip } from "antd";

interface EllipsisProps {
  /** 内容 */
  title?: ReactNode;
  children?: ReactNode;
  [key: string]: any;
}

const Ellipsis: React.FC<EllipsisProps> = props => {
  const { title, children, ...restProps } = props;
  const titleNode = title || children;
  const childrenNode = children || title;
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const checkOverflow = () => {
    if (containerRef.current && textRef.current) {
      setDisabled(containerRef.current?.clientWidth >= textRef.current?.scrollWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  return (
    <Tooltip title={titleNode} open={open} {...restProps}>
      <div ref={containerRef} style={{ display: "grid" }}>
        <div
          ref={textRef}
          onMouseEnter={() => setOpen(!disabled)}
          onMouseLeave={() => setOpen(false)}
          style={{ width: "100%" }}
          className="text-overflow"
        >
          {childrenNode}
        </div>
      </div>
    </Tooltip>
  );
};

export default Ellipsis;
