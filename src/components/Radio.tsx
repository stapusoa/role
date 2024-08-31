const { widget } = figma;
const { Frame, SVG, useSyncedState, AutoLayout, Text, Ellipse } = widget;

import { CircleIcon, RadioFillIcon, defaultSVG } from "./Icons";
import { applyStrokeColorToSVG, applyColorToSVG } from './utils';

interface CircleRadioProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  scale: number;
  customSVG: string;
  headerColor: string;
  setCustomSVG: (value: string) => void;
}

export function RadioButton({ label, value, selectedValue, scale, onChange, customSVG, headerColor, setCustomSVG }: CircleRadioProps) {
  const isSelected = value === selectedValue;

  return (
    <AutoLayout
      direction="horizontal"
      spacing={8 * scale}
      padding={4 * scale}
      onClick={() => onChange(value)}
      verticalAlignItems="center"
      horizontalAlignItems={'start'}
    >
      <Frame
  width={24 * scale}
  height={24 * scale}
>
  <SVG
    src={CircleIcon({ width: 24 * scale, height: 24 * scale, fill: isSelected ? headerColor : '#DADADA' })}
    width={24 * scale}
    height={24 * scale}
    x={0}
    y={0}
  />
  {isSelected && (
    <SVG
      src={RadioFillIcon({ width: 12 * scale, height: 12 * scale, fill: isSelected ? headerColor : '#DADADA' })}
      width={12 * scale}
      height={12 * scale}
      x={(24 * scale - 12 * scale) / 2}
      y={(24 * scale - 12 * scale) / 2}
    />
  )}
</Frame>
      <Text fontFamily="Inter" fontSize={24 * scale } fontWeight={500} fill={'#8B8C95'}>{label}</Text>
    </AutoLayout>
  );
}
