const { widget } = figma

import { defaultSVG } from './Icons';

const { AutoLayout, Text, SVG, Input } = widget;

interface HeaderProps {
  isEditing: boolean;
  customSVG: string;
  headerColor: string;
  scale: number;
  setCustomSVG: (value: string) => void;
  setIsEditing: (value: boolean) => void;
}

export function Header({
  isEditing,
  customSVG,
  headerColor,
  scale,
  setCustomSVG,
  setIsEditing,
}: HeaderProps) {

  // Function to apply headerColor as a mask to the SVG
  const applyColorToSVG = (svgString: string, color: string): string => {
    if (!svgString) {
      return ''; // Return an empty string if no SVG is provided
    }
    try {
      return svgString.replace(/fill=".*?"/g, `fill="${color}"`);
    } catch (error) {
      console.error('Error applying color to SVG:', error);
      return svgString; // Return the original string if something goes wrong
    }
  };

  return (
    <AutoLayout
      direction={'horizontal'}
      horizontalAlignItems={'start'}
      verticalAlignItems={'center'}
      spacing={'auto'}
      width={'fill-parent'}
      padding={{
        vertical: 24 * scale,
        horizontal: 32 * scale,
      }}
    >
      <AutoLayout
        direction={'horizontal'}
        horizontalAlignItems={'start'}
        verticalAlignItems={'center'}
        spacing={12 * scale}
      >
        {isEditing ? (
          <Input
            value={customSVG}
            onTextEditEnd={(e) => {
              const processedSVG = applyColorToSVG(e.characters, headerColor);
              setCustomSVG(processedSVG);
              setIsEditing(false);
            }}
            placeholder="Paste your SVG code here..."
            fontSize={12 * scale}
            fill={'#333333'}
            inputFrameProps={{
              padding: { top: 8, bottom: 8, left: 8, right: 8 },
              cornerRadius: 8,
              stroke: '#E0E0E0',
            }}
            width={200 * scale}
          />
        ) : (
          <SVG
            src={applyColorToSVG(customSVG || defaultSVG(headerColor), headerColor)}
            width={32 * scale}
            height={32 * scale}
          />
        )}
        <Text
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={600}
          fill={headerColor}
          horizontalAlignText={'left'}
        >
          DESIGN ARTIFACTS
        </Text>
      </AutoLayout>

      <AutoLayout
        padding={8 * scale}
        cornerRadius={4 * scale}
        fill={headerColor}
      >
        <Text
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={600}
          fill={'#FFFFFF'}
          horizontalAlignText={'center'}
        >
          1 / 4
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}