const { widget } = figma;
const { AutoLayout, Text, SVG, Frame, useSyncedState } = widget;

import { applyStrokeColorToSVG, applyColorToSVG } from './utils';
import { defaultSVG, SelectIcon } from './Icons'

interface DropdownProps {
  label: string;
  scale: number;
  placeholder: string;
  options: string[];
  selectedValue: string;
  onChange: (value: string) => void;
  customSVG: string;
  headerColor: string;
  setCustomSVG: (value: string) => void;
}

export function Dropdown({
  label,
  scale,
  placeholder,
  options,
  selectedValue,
  onChange,
  customSVG,
  headerColor,
  setCustomSVG
}: DropdownProps) {
  const [isOpen, setIsOpen] = useSyncedState('isOpen', false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
      spacing={8 * scale}
      width={'hug-contents'}
    >
      <AutoLayout
        direction={'horizontal'}
        padding={{
          horizontal: 0,
          vertical: 4 * scale,
        }}
        width={'hug-contents'}
      >
      <Text
        fontFamily="Inter"
        fontSize={24 * scale}
        fontWeight={500}
        horizontalAlignText="left"
        fill="#636366"
      >
        {label}
      </Text>
      </AutoLayout>
      <AutoLayout
        direction="horizontal"
        width={648 * scale}
        padding={16 * scale}
        spacing="auto"
        horizontalAlignItems="start"
        verticalAlignItems="center"
        cornerRadius={8 * scale}
        stroke="#DADCE2"
        strokeWidth={1 * scale}
        strokeAlign="inside"
        onClick={toggleDropdown}
      >
        <Text
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={500}
          fill={selectedValue ? "#5A5A5A" : "#8B8C95"}
          width="fill-parent"
          horizontalAlignText="left"
        >
          {selectedValue || placeholder}
        </Text>
        <Frame
          width={16 * scale}
          height={17 * scale}
        >
          <SVG
            src={applyColorToSVG(SelectIcon({ width: 16 * scale, height: 16 * scale }), headerColor)}
            width={16 * scale}
            height={16 * scale}
          />
        </Frame>
      </AutoLayout>
      {isOpen && (
        <AutoLayout
          direction="vertical"
          width={648 * scale}
          padding={8 * scale}
          cornerRadius={8 * scale}
          stroke="#DADCE2"
          strokeWidth={1 * scale}
          strokeAlign="inside"
          fill="#FFFFFF"
        >
          {options.map((option, index) => (
            <AutoLayout
              key={index}
              direction="horizontal"
              padding={{ vertical: 8 * scale, horizontal: 12 * scale }}
              width="fill-parent"
              verticalAlignItems="center"
              onClick={() => handleSelect(option)}
            >
              <Text
                fontFamily="Inter"
                fontSize={24 * scale}
                fontWeight={500}
                fill="#000000"
                width="fill-parent"
                horizontalAlignText="left"
              >
                {option}
              </Text>
            </AutoLayout>
          ))}
        </AutoLayout>
      )}
    </AutoLayout>
  );
}
