const { widget } = figma

const { AutoLayout, Text } = widget;

interface TitleProps {
  scale: number;
}

export function Title({
  scale
}: TitleProps) {

  return (
    <AutoLayout
      direction={'vertical'}
      horizontalAlignItems={'start'}
      spacing={8}
    >
      <AutoLayout
        direction={'horizontal'}
        padding={{
          horizontal: 0,
          vertical: 4,
        }}
      >
        <Text
          fontFamily="Inter"
          fontSize={44 * scale}
          fontWeight={600}
          horizontalAlignText={'left'}
          fill={'#4B5563'}
        >
          User Persona
        </Text>
      </AutoLayout>
      <AutoLayout
        direction={'horizontal'}
        padding={{
          horizontal: 0,
          vertical: 4,
        }}
      >
        <Text
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={400}
          horizontalAlignText={'left'}
          fill={'#71717A'}
        >
          Fill out the form below to create the scenario artifacts.
        </Text>
      </AutoLayout>
    </AutoLayout>
  )
}