const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

interface SliderProps {
  scale: number;
}

export function AgeSlider({
  scale
}: SliderProps) {
  const [selectedSection, setSelectedSection] = useSyncedState('selectedSection', 0);

  const sections = [
    "Under 18",
    "18 to 24",
    "25 to 34",
    "35 to 44",
    "45 to 54",
    "55 to 64",
    "65 or older",
  ];

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
      direction="vertical"
      spacing={8 * scale}
      padding={0}
      width="hug-contents"
      horizontalAlignItems="start"
    >
      <Text fontFamily="Inter" fontSize={24 * scale} fontWeight={500} fill={'#8B8C95'}>
        {sections[selectedSection]}
      </Text>
      
      <AutoLayout
        direction="horizontal"
        width={648 * scale}
        spacing={16 * scale}
        padding={0}
        horizontalAlignItems="start"
      >
        {sections.map((section, index) => (
          <AutoLayout
            key={index}
            width={40 * scale}
            height={40 * scale}
            cornerRadius={30 * scale}
            fill={index === selectedSection ? "#007AFF" : "#E0E0E0"}
            onClick={() => setSelectedSection(index)}
          />
        ))}
      </AutoLayout>
    </AutoLayout>
    </AutoLayout>
  );
}

widget.register(AgeSlider);
