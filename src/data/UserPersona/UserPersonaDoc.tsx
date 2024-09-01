const { widget } = figma
import { NameCard } from './nameCard';
import { AvatarOption } from '../../components/AvatarButton/types';
import { avatars } from '../../components/AvatarButton/Avatar'; // Assuming avatars are imported from here
import { PersonaBlock } from './personaBlock';
import { GoalIcon, NeedsIcon, ProblemIcon, MotiveIcon } from '../../components/Icons';
const { AutoLayout, Text, Rectangle } = widget;

interface UserPersonaProps {
  scale: number;
  headerColor: string;
  name: string;
  age: string;
  role: string;
  traits: string;
  goals: string;
  education: string;
  industry: string;
  selectedAvatar: string;
}

export function UserPersonaDoc({
  scale,
  headerColor,
  name,
  age,
  role,
  traits,
  goals,
  education,
  industry,
  selectedAvatar
}: UserPersonaProps) {

  const personaBlocks = [
    {
      title: 'Goals',
      icon: GoalIcon,
      details: goals,
    },
    {
      title: 'Needs',
      icon: NeedsIcon,
      details: 'What they need...', // Replace with actual data
    },
    {
      title: 'Concerns',
      icon: ProblemIcon,
      details: 'What concerns them...', // Replace with actual data
    },
    {
      title: 'Motivations',
      icon: MotiveIcon,
      details: 'What motivates them...', // Replace with actual data
    }
  ];

  return (
    <AutoLayout
      direction='vertical'
      padding={{
        top: 16 * scale,
        bottom: 32 * scale,
        left: 32 * scale,
        right: 32 * scale
      }}
      spacing={64 * scale}
    >
      <AutoLayout // header
        direction={'vertical'}
        horizontalAlignItems={'start'}
        verticalAlignItems={'start'}
        spacing={16 * scale}
        padding={{
          right: 300 * scale,
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        {/* Title and Description */}
        <AutoLayout // title
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'center'}
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
        <AutoLayout // description
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'center'}
          spacing={24 * scale}
          maxWidth={1200 * scale}
        >
          <Rectangle
            width={5 * scale}
            height="fill-parent"
            fill={headerColor}
          />
          <Text
            fontFamily="Inter"
            fontSize={32 * scale}
            fontWeight={400}
            italic={true}
            lineHeight={'160%'}
            horizontalAlignText={'left'}
            fill={'#71717A'}
            width={'fill-parent'}
          >
            {name}, a {role}, is a {traits} who seeks {goals}
          </Text>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout // data
        direction={'horizontal'}
        spacing={80 * scale}
        horizontalAlignItems={'start'}
        verticalAlignItems={'start'}
      >
        <NameCard
          scale={scale}
          headerColor={headerColor}
          name={name}
          age={age}
          role={role}
          industry={industry}
          goals={goals}
          selectedAvatar={selectedAvatar}
          traits={traits}
          education={education}
          avatars={avatars} // Pass avatars array here
        />
          <AutoLayout // grid
      direction={'vertical'}
      spacing={32 * scale}
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
      overflow={'visible'}

    >
      <AutoLayout // row
        direction={'horizontal'}
        spacing={90 * scale}
        horizontalAlignItems={'center'}
        verticalAlignItems={'start'}
        overflow={'visible'}

      >
        {personaBlocks.map((block, index) => (
    <PersonaBlock
      key={index}
      scale={scale}
      headerColor={headerColor}
      title={block.title}
     // blockIcon={block.icon}
      blockDetails={block.details}
    />
  ))}
       
      </AutoLayout>
      </AutoLayout>
      </AutoLayout>
    </AutoLayout>
  );
}
