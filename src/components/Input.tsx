const { widget } = figma

const { AutoLayout, Text, Input } = widget;

interface InputProps {
  label: string;
  scale: number;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function CustomInput({
  label, scale, value, placeholder, onChange
}: InputProps) {

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
        padding={16 * scale}
        horizontalAlignItems={'start'}
        verticalAlignItems={'center'}
        cornerRadius={8 * scale}
        stroke={'#DADCE2'}
        strokeWidth={1 * scale}
        strokeAlign={'inside'}
        height={61 * scale}
      >
        <Input
          value={value} // Use value prop here
          onTextEditEnd={(e) => onChange(e.characters)} // Use onChange prop here
          placeholder={placeholder}
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={500}
          fill={'#8B8C95'}
          width={'fill-parent'}
          height={29 * scale}
          truncate={true}
        />
      </AutoLayout>
    </AutoLayout>
  )
}