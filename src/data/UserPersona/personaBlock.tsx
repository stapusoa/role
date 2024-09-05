const { widget } = figma
const { AutoLayout, Text, SVG, Frame } = widget;
import { ArrowIcon, GoalIcon, ProblemIcon, NeedsIcon, MotiveIcon } from "../../components/Icons";


interface PersonaBlockProps {
  scale: number;
  headerColor: string;
  title: string;
  blockIcon: string;
  blockDetails: string;
}


export function PersonaBlock({
  scale,
  headerColor,
  title,
  blockIcon,
  blockDetails
}: PersonaBlockProps) {

  return (
    <AutoLayout // block
      direction={'vertical'}
      spacing={32 * scale}
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
      overflow={'visible'}
width={347 * scale}
    >
      <AutoLayout // title
        direction={'horizontal'}
        spacing={24 * scale}
        horizontalAlignItems={'center'}
        verticalAlignItems={'start'}
        overflow={'visible'}
      >
        <AutoLayout // icon block
          direction={'horizontal'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'center'}
          padding={16 * scale}
          fill={'#F1F5F9'}
          effect={{
            type: "drop-shadow",
            color: '#0000001A',
            offset: {
              x: 0,
              y: 10 * scale,
            },
            blur: 20 * scale,
          }}
          cornerRadius={8 * scale}
          overflow={'hidden'}
        >
          <SVG 
            src={blockIcon}
            width={32 * scale}
            height={32 * scale}
          />
        </AutoLayout>
        <Text
          fontFamily="Inter"
          fontSize={32 * scale}
          fontWeight={600}
          horizontalAlignText={'left'}
          fill={headerColor}
        >
          {title}
        </Text>
      </AutoLayout>
      <Text
        fontFamily="Inter"
        fontSize={24 * scale}
        fontWeight={500}
        fill={'#4B5563'}
        width={'fill-parent'}
      >
        {blockDetails}
      </Text>
    </AutoLayout>
  )
}