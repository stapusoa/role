const { widget } = figma;
const { Frame, SVG, useSyncedState, AutoLayout } = widget;

import { userAmmon, userAna, userBraxton, userCheyenne, userErik, userKaren, userMichael, userTargaryen } from "./Avatar";
import { applyStrokeColorToSVG, applyColorToSVG } from './utils';
import { defaultSVG } from './Icons'

interface RadioButtonProps {
  scale: number;
  customSVG: string;
  headerColor: string;
  setCustomSVG: (value: string) => void;
}

export function AvatarRadioButton({
  scale,
  customSVG,
  headerColor,
  setCustomSVG
}: RadioButtonProps) {
  const avatars = [
    { id: 'ammon', svg: userAmmon },
    { id: 'ana', svg: userAna },
    { id: 'braxton', svg: userBraxton },
    { id: 'cheyenne', svg: userCheyenne },
    { id: 'erik', svg: userErik },
    { id: 'karen', svg: userKaren },
    { id: 'michael', svg: userMichael },
    { id: 'targaryen', svg: userTargaryen }
  ];

  const [selectedAvatar, setSelectedAvatar] = useSyncedState('selectedAvatar', avatars[0].id);

  return (
    <AutoLayout spacing={32 * scale} direction="horizontal" wrap={true} width={648 * scale}>
      {avatars.map((avatar) => (
        <AutoLayout
          key={avatar.id}
          width={138 * scale}
          height={138 * scale}
          cornerRadius={8 * scale}
          horizontalAlignItems={'center'}
          verticalAlignItems={'end'}
          fill={selectedAvatar === avatar.id ? headerColor : '#FFFFFF'}
          stroke={selectedAvatar === avatar.id ? headerColor : '#DADCE2'}
          strokeWidth={selectedAvatar === avatar.id ? 3 * scale : 2 * scale}
          effect={
            selectedAvatar === avatar.id
              ? [
                {
                  type: 'drop-shadow',
                  color: '#00000033',
                  offset: { x: 1 * scale, y: 8 * scale },
                  blur: 15 * scale,
                },
              ]
              : []
          }
          onClick={() => setSelectedAvatar(avatar.id)}
        >
          <SVG
            src={avatar.svg}
            width={120 * scale}
            height={120 * scale}
          />
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}

widget.register(AvatarRadioButton);
