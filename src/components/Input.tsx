const { widget } = figma

const { AutoLayout, Text, SVG, Input } = widget;

interface InputProps {
  scale: number;
}

export function CustomInput({
  scale
}: InputProps) {
  const [inputValue, setInputValue] = widget.useSyncedState('inputValue', '');

  return (
    <AutoLayout
      direction={'vertical'}
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
      spacing={8 * scale}
    >
      <AutoLayout
        direction={'horizontal'}
        padding={{
          horizontal: 0,
          vertical: 4 * scale,
        }}
      >
        <Text
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={500}
          horizontalAlignText={'left'}
          fill={'#636366'}
        >
          User Name
        </Text>
      </AutoLayout>
      <AutoLayout
        direction={'horizontal'}
        width={648 * scale}
        padding={16 * scale}
        horizontalAlignItems={'start'}
        verticalAlignItems={'center'}
        cornerRadius={8 * scale}
        stroke={'#DADCE2'}
        strokeWidth={1 * scale}
        strokeAlign={'inside'}
      >
        <Input
          value={inputValue}
          onTextEditEnd={(e) => setInputValue(e.characters)}
          placeholder="e.g., Piper"
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={500}
          fill={'#8B8C95'}
          width={'fill-parent'}
        />
      </AutoLayout>
    </AutoLayout>
  )
}