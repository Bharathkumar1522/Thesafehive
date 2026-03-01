import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  w: number; // required pixel width
  h: number; // required pixel height
  eager?: boolean; // set true for LCP image only
};

export default function Img({ w, h, eager, decoding = "async", loading, ...rest }: Props) {
  return (
    <img
      width={w}
      height={h}
      decoding={decoding}
      loading={eager ? undefined : (loading ?? "lazy")}
      fetchpriority={eager ? "high" : undefined}
      {...rest}
    />
  );
}
