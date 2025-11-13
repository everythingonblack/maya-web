interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  iconOnly?: boolean;
}

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
<img
    src="/LOGO-BJS-NEW.png"
    alt="MAYAGEN Logo"
    width={iconOnly ? 36 : 1024}
    height={iconOnly ? 36 : 312}
    {...props}
/>
  );
}
