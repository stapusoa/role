const { widget } = figma

const { AutoLayout, Text, SVG, Input } = widget;

import { MinusIcon, PlusIcon } from './Icons'
import { applyColorToSVG } from './utils';

interface CounterProps {
  scale: number;
  label: string;
  unit: string;
  value: string;
  min?: number;
  max?: number;
  initialNumber?: number;
  customSVG: string;
  buttonColor: string;
  setCustomSVG: (value: string) => void;
  onChange: (value: string) => void;
}

export function Counter({
  scale,
  label,
  unit,
  value,
  min = 0,
  max = Infinity,
  initialNumber = 0,
  customSVG,
  buttonColor,
  setCustomSVG,
  onChange
}: CounterProps) {

  const handleIncrement = () => {
    const newValue = Math.min(parseInt(value) + 1, max);
    onChange(newValue.toString()); // Use onChange to update parent state
  };

  const handleDecrement = () => {
    const newValue = Math.max(parseInt(value) - 1, min);
    onChange(newValue.toString()); // Use onChange to update parent state
  };

  const handleInputChange = (newValue: string) => {
    const numValue = parseInt(newValue);
    if (!isNaN(numValue)) {
      onChange(Math.max(min, Math.min(numValue, max)).toString()); // Use onChange to update parent state
    }
  };

  return (
    <AutoLayout
      direction={'vertical'}
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
          horizontalAlignText={'left'}
          fill={'#636366'}
        >
          {label}
        </Text>
      </AutoLayout>
      <AutoLayout
        direction={'horizontal'}
        width={648 * scale}
        padding={8 * scale}
        spacing={'auto'}
        horizontalAlignItems={'center'}
        verticalAlignItems={'center'}
        cornerRadius={8 * scale}
        stroke={'#DADCE2'}
        strokeWidth={1 * scale}
        strokeAlign={'inside'}
      >
        <AutoLayout
          direction={'horizontal'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'center'}
          width={40 * scale}
          height={40 * scale}
          onClick={handleDecrement}
        >
          <SVG
            src={applyColorToSVG(MinusIcon({ width: 24 * scale, height: 24 * scale }), buttonColor)}
            width={24 * scale}
            height={24 * scale}
          />
        </AutoLayout>
        <AutoLayout
          direction={'horizontal'}
          width={'fill-parent'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'center'}
          padding={{
            vertical: 8 * scale,
            horizontal: 0
          }}
        >
          <Input
            value={`${value} ${unit}`} // Use value prop here
            onTextEditEnd={(e) => handleInputChange(e.characters)}
            placeholder={`0 ${unit}`}
            fontFamily="Inter"
            fontSize={24 * scale}
            fontWeight={500}
            fill={'#8B8C95'}
            horizontalAlignText={'center'}
            width={'fill-parent'}
          />
        </AutoLayout>
        <AutoLayout
          direction={'horizontal'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'center'}
          width={40 * scale}
          height={40 * scale}
          onClick={handleIncrement}
        >
          <SVG
            src={applyColorToSVG(PlusIcon({ width: 24 * scale, height: 24 * scale }), buttonColor)}
            width={24 * scale}
            height={24 * scale}
          />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  )
}