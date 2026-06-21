import Svg, { SvgProps, Path, Circle, Rect } from "react-native-svg";

export type IconName =
  | "search"
  | "album"
  | "plus"
  | "settings"
  | "circle"
  | "chevron-right"
  | "chevron-left"
  | "close"
  | "music"
  | "ellipsis"
  | "chevrons-up-down"
  | "layout-list"
  | "arrow-down-up"
  | "home"
  | "guitar";

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
    case "close":
      return <CloseIcon {...svgIconProps} />;
    case "music":
      return <MusicIcon {...svgIconProps} />;
    case "ellipsis":
      return <EllipsisIcon {...svgIconProps} />;
    case "chevrons-up-down":
      return <ChevronsUpDownIcon {...svgIconProps} />;
    case "layout-list":
      return <LayoutListIcon {...svgIconProps} />;
    case "arrow-down-up":
      return <ArrowDownUpIcon {...svgIconProps} />;
    case "home":
      return <HomeIcon {...svgIconProps} />;
    case "guitar":
      return <GuitarIcon {...svgIconProps} />;
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

const CloseIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="M18 6 6 18M6 6l12 12" />
  </Svg>
);

const MusicIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="M9 18V5l12-2v13M9 9l12-2" />
    <Circle cx={6} cy={18} r={3} />
    <Circle cx={18} cy={16} r={3} />
  </Svg>
);

const EllipsisIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Circle cx={12} cy={12} r={1} />
    <Circle cx={19} cy={12} r={1} />
    <Circle cx={5} cy={12} r={1} />
  </Svg>
);

const ChevronsUpDownIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="m7 15 5 5 5-5M7 9l5-5 5 5" />
  </Svg>
);

const LayoutListIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Rect width={7} height={7} x={3} y={3} rx={1} />
    <Rect width={7} height={7} x={3} y={14} rx={1} />
    <Path d="M14 4h7M14 9h7M14 15h7M14 20h7" />
  </Svg>
);

const ArrowDownUpIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
  </Svg>
);

const HomeIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <Path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Svg>
);

const GuitarIcon = (props: SvgIconProps) => (
  <Svg {...props}>
    <Path d="m11.9 12.1 4.514-4.514M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4zM6 16l2 2M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z" />
  </Svg>
);
