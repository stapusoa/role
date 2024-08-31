const { widget } = figma

const { AutoLayout, Text, SVG, Input } = widget;

import { MinusIcon, PlusIcon, defaultSVG } from './Icons'
import { applyColorToSVG } from './utils';

interface CounterProps {
  scale: number;
  label: string;
  unit: string;
  min?: number;
  max?: number;
  initialValueNum?: number;
  customSVG: string;
  buttonColor: string;
  setCustomSVG: (value: string) => void;
}

export function Counter({
  scale,
  label,
  unit,
  min = 0,
  max = Infinity,
  initialValueNum = 0,
  customSVG,
  buttonColor,
  setCustomSVG
}: CounterProps) {
  const [inputValueNum, setInputValue] = widget.useSyncedState('inputValueNum', initialValueNum.toString());

  const handleIncrement = () => {
    const newValue = Math.min(parseInt(inputValueNum) + 1, max);
    setInputValue(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(parseInt(inputValueNum) - 1, min);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setInputValue(Math.max(min, Math.min(numValue, max)).toString());
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
            value={`${inputValueNum} ${unit}`}
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