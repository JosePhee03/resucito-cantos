import Svg, { SvgProps, Path, Circle, Rect } from "react-native-svg";

type IconName =
  | "search"
  | "album"
  | "plus"
  | "settings"
  | "circle"
  | "chevron-right"
  | "chevron-left"
  | "close"
  | "music"
  | "options"
  | "chevrons-up-down"
  | "layout-list"
  | "arrow-down-up";

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
    case "options":
      return <OptionsIcon {...svgIconProps} />;
    case "chevrons-up-down":
      return <ChevronsUpDownIcon {...svgIconProps} />;
    case "layout-list":
      return <LayoutListIcon {...svgIconProps} />;
    case "arrow-down-up":
      return <ArrowDownUpIcon {...svgIconProps} />;
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

const OptionsIcon = (props: SvgIconProps) => (
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
