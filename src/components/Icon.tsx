import Svg, { SvgProps, Path, Circle, Rect } from "react-native-svg";

type IconProps = SvgProps & {
  size?: number;
  color?: string;
};

export const SearchIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    color={props.color}
    {...props}
  >
    <Path d="m21 21-4.34-4.34" />
    <Circle cx={11} cy={11} r={8} />
  </Svg>
);

export const AlbumIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    {...props}
  >
    <Rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
    <Path d="M11 3v8l3-3 3 3V3" />
  </Svg>
);

export const PlusIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    {...props}
  >
    <Path d="M5 12h14M12 5v14" />
  </Svg>
);

export const SettingsIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    {...props}
  >
    <Path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
    <Circle cx={12} cy={12} r={3} />
  </Svg>
);

export const CircleIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    fill="currentColor"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
  </Svg>
);

export const ChevronRightIcon = ({
  size = 24,
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <Svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    strokeWidth={strokeWidth}
    {...props}
  >
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);
