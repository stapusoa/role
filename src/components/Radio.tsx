const { widget } = figma;
const { Frame, SVG, useSyncedState, AutoLayout, Text, Ellipse } = widget;

import { CircleIcon, RadioFillIcon } from "./Icons";

interface CircleRadioProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  scale: number;
}

export function RadioButton({ label, value, selectedValue, scale, onChange }: CircleRadioProps) {
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
    src={CircleIcon({ width: 24 * scale, height: 24 * scale, fill: isSelected ? '#000000' : '#DADADA' })}
    width={24 * scale}
    height={24 * scale}
    x={0}
    y={0}
  />
  {isSelected && (
    <SVG
      src={RadioFillIcon({ width: 12 * scale, height: 12 * scale })}
      width={12 * scale}
      height={12 * scale}
      x={(24 * scale - 12 * scale) / 2}
      y={(24 * scale - 12 * scale) / 2}
    />
  )}
</Frame>
      <Text fontSize={16}>{label}</Text>
    </AutoLayout>
  );
}
