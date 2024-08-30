const { widget } = figma

const { AutoLayout, Text, SVG, Input } = widget;

import { MinusIcon, PlusIcon } from './Icons'

interface CounterProps {
  scale: number;
}

export function Counter({
  scale
}: CounterProps) {
  const [inputValue, setInputValue] = widget.useSyncedState('inputValue', '');

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
          Age
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
        >
          <MinusIcon width={24 * scale} height={24 * scale} fill="#636366" />
        </AutoLayout>
        <AutoLayout
          direction={'horizontal'}
          width={'hug-contents'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'center'}
          padding={{
            vertical: 8 * scale,
            horizontal: 0
          }}
        >
        <Input
          value={inputValue}
          onTextEditEnd={(e) => setInputValue(e.characters)}
          placeholder="0 years old"
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={500}
          fill={'#8B8C95'}
          horizontalAlignText={'center'}
        />
        </AutoLayout>
        <AutoLayout
          direction={'horizontal'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'center'}
          width={40 * scale}
          height={40 * scale}
        >
          <PlusIcon width={24 * scale} height={24 * scale} fill="#636366" />
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  )
}