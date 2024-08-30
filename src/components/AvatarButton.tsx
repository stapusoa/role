const { widget } = figma;
const { Frame, SVG, useSyncedState, AutoLayout } = widget;

import { userAmmon, userAna, userBraxton, userCheyenne, userErik, userKaren, userMichael, userTargaryen } from "./Avatar";

interface RadioButtonProps {
  scale: number
}

export function AvatarRadioButton({
  scale
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
          stroke={selectedAvatar === avatar.id ? '#0000FF' : '#DADCE2'}
          strokeWidth={2 * scale}
          effect={
            selectedAvatar === avatar.id
              ? [
                  {
                    type: 'drop-shadow',
                    color: '#00000026',
                    offset: { x: 0, y: 4 },
                    blur: 4,
                  },
                ]
              : []
          }
          fill={'#FFFFFF'}
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
