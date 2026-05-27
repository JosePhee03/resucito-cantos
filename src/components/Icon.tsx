import Svg, { SvgProps, Path, Circle, Rect } from "react-native-svg";

type IconName =
  | "search"
  | "album"
  | "plus"
  | "settings"
  | "circle"
  | "chevron-right"
  | "chevron-left"
  | "list-filter";

type IconProps = SvgProps & {
  name: IconName;
  size?: number;
};

type SvgIconProps = SvgProps;

export default function Icon({
  name,
  size = 24,
  fill = "none",
  strokeWidth = 2,
  ...props
}: IconProps) {
  const svgIconProps: SvgIconProps = {
    height: size,
    width: size,
    fill,
    strokeWidth,
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
    ...props,
  };

  switch (name) {
    case "search":
      return <SearchIcon {...svgIconProps} />;
    case "album":
      return <AlbumIcon {...svgIconProps} />;
    case "plus":
      return <PlusIcon {...svgIconProps} />;
    case "settings":
      return <SettingsIcon {...svgIconProps} />;
    case "circle":
      return <CircleIcon {...svgIconProps} />;
    case "chevron-right":
      return <ChevronRightIcon {...svgIconProps} />;
    case "chevron-left":
      return <ChevronLeftIcon {...svgIconProps} />;
    case "list-filter":
      return <ListFiltIcon {...svgIconProps} />;
  }
}

const SearchIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="m21 21-4.34-4.34" />
    <Circle cx={11} cy={11} r={8} />
  </Svg>
);

const AlbumIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
    <Path d="M11 3v8l3-3 3 3V3" />
  </Svg>
);

const PlusIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="M5 12h14M12 5v14" />
  </Svg>
);

const SettingsIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
    <Circle cx={12} cy={12} r={3} />
  </Svg>
);

const CircleIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Circle cx={12} cy={12} r={10} />
  </Svg>
);

const ChevronRightIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);

const ChevronLeftIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="m15 18-6-6 6-6" />
  </Svg>
);

const ListFiltIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="M2 5h20M6 12h12M9 19h6" />
  </Svg>
);
