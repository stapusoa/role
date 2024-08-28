const { widget } = figma;
const { AutoLayout, Text, useSyncedState } = widget;

export function AgeSlider() {
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
          fontSize={24}
          fontWeight={500}
          horizontalAlignText={'left'}
          fill={'#636366'}
        >
          Age
        </Text>
      </AutoLayout>

    <AutoLayout
      direction="vertical"
      spacing={8}
      padding={0}
      width="hug-contents"
      horizontalAlignItems="start"
    >
      <Text fontFamily="Inter" fontSize={24} fontWeight={500} fill={'#8B8C95'}>
        {sections[selectedSection]}
      </Text>
      
      <AutoLayout
        direction="horizontal"
        spacing={8}
        padding={0}
        horizontalAlignItems="start"
      >
        {sections.map((section, index) => (
          <AutoLayout
            key={index}
            width={24}
            height={24}
            cornerRadius={12}
            fill={index === selectedSection ? "#007AFF" : "#E0E0E0"}
            onClick={() => setSelectedSection(index)}
          />
        ))}
      </AutoLayout>
      
      <AutoLayout
        direction="horizontal"
        spacing={8}
        horizontalAlignItems="center"
      >
        {sections.map((section, index) => (
          <Text key={index} fontSize={10} width={24} horizontalAlignText="center">
            {index + 1}
          </Text>
        ))}
      </AutoLayout>
    </AutoLayout>
    </AutoLayout>
  );
}

widget.register(AgeSlider);
