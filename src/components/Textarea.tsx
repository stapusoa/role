const { widget } = figma

const { AutoLayout, Text, SVG, Input } = widget;

interface TextareaProps {
  label: string;
  scale: number;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

export function Textarea({
  label, scale, value, placeholder, onChange
}: TextareaProps) {

  return (
    <AutoLayout
      direction={'vertical'}
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
      spacing={8 * scale}
      width={'hug-contents'}
      height={'hug-contents'}
    >
      <AutoLayout
        direction={'horizontal'}
        padding={{
          horizontal: 0,
          vertical: 4 * scale,
        }}
        width={'hug-contents'}
        height={'hug-contents'}
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
        verticalAlignItems={'start'}
        cornerRadius={8 * scale}
        stroke={'#DADCE2'}
        strokeWidth={1 * scale}
        strokeAlign={'inside'}
      >
        <Input
          value={value}
          onTextEditEnd={(e) => onChange(e.characters)}
          placeholder={placeholder}
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={500}
          fill={'#8B8C95'}
          width={'fill-parent'}
          height={'hug-contents'}
        />
      </AutoLayout>
    </AutoLayout>
  )
}