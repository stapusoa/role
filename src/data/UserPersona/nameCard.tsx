const { widget } = figma
import { AvatarOption } from '../../components/AvatarButton/types';

const { AutoLayout, Text, SVG, Frame } = widget;

interface NameCardProps {
  scale: number;
  headerColor: string;
  name: string;
  age: string;
  education: string;
  role: string;
  traits: string;
  goals: string;
  selectedAvatar: string;
  industry: string;
  avatars: AvatarOption[];  // Array of avatars
}

export function NameCard({
  scale,
  headerColor,
  name,
  age,
  role,
  education,
  traits,
  goals,
  industry,
  selectedAvatar,
  avatars
}: NameCardProps) {

  const selectedAvatarData = avatars.find(avatar => avatar.id === selectedAvatar);

  return (
    <AutoLayout // name card
      direction={'vertical'}
      spacing={64 * scale}
      padding={{
        vertical: 0,
        horizontal: 24 * scale
      }}
      horizontalAlignItems={'center'}
      verticalAlignItems={'center'}
    >
      <Frame
        width={250 * scale}
        height={250 * scale}
      >
        {selectedAvatarData && (
          <SVG
            src={selectedAvatarData.svg}
            width={250 * scale}
            height={250 * scale}
          />
        )}
      </Frame>
      {/* Rest of the NameCard layout */}
      <AutoLayout // caption
        direction={'vertical'}
        spacing={16 * scale}
        horizontalAlignItems={'center'}
        verticalAlignItems={'start'}
      >
        <Text // name
          fontFamily="Inter"
          fontSize={44 * scale}
          fontWeight={600}
          horizontalAlignText={'center'}
          fill={'#71717A'}
        >
          {name}
        </Text>
        <AutoLayout // info
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'start'}
          spacing={16 * scale}
        >
          {/* Labels and information */}
          <AutoLayout
            direction={'vertical'}
            horizontalAlignItems={'end'}
            verticalAlignItems={'end'}
            spacing={16 * scale}
          >
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={600}
              horizontalAlignText={'right'}
              fill={headerColor}
            >Age</Text>
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={600}
              horizontalAlignText={'right'}
              fill={headerColor}
            >Education</Text>
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={600}
              horizontalAlignText={'right'}
              fill={headerColor}
            >Role</Text>
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={600}
              horizontalAlignText={'right'}
              fill={headerColor}
            >Industry</Text>
          </AutoLayout>
          <AutoLayout // values
            direction={'vertical'}
            horizontalAlignItems={'start'}
            verticalAlignItems={'start'}
            spacing={16 * scale}
          >
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={500}
              horizontalAlignText={'left'}
              fill={'#4B5563'}
            >{age} years old</Text>
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={500}
              horizontalAlignText={'left'}
              fill={'#4B5563'}
            >{education}</Text>
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={500}
              horizontalAlignText={'left'}
              fill={'#4B5563'}
            >{role}</Text>
            <Text
              fontFamily="Inter"
              fontSize={24 * scale}
              fontWeight={500}
              horizontalAlignText={'left'}
              fill={'#4B5563'}
            >{industry}</Text>
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}
