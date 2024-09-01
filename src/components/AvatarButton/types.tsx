const { widget } = figma
const { AutoLayout, SVG } = widget;

export type AvatarProps = {
  id: string;
  svg: string;
  width: number;
  height: number;
};

export type AvatarButtonProps = {
  scale: number;
  options: AvatarOption[];
  selectedAvatar: string;
  onSelect: (id: string, svg: string) => void; // Updated signature
  headerColor: string;
  customSVG: string;
  setCustomSVG: (value: string) => void;
};

export type AvatarOption = {
  id: string;
  svg: string;
  width: number;
  height: number;
};
