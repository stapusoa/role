// AvatarButton.tsx

import { AvatarButtonProps } from './types';
import { avatars } from './Avatar';

const { widget } = figma;
const { AutoLayout, SVG } = widget;

export function AvatarRadioButton({
  scale,
  headerColor,
  onSelect,
  selectedAvatar,
  options
}: AvatarButtonProps) {
  
  return (
    <AutoLayout spacing={32 * scale} direction="horizontal" wrap={true} width={648 * scale}>
      {options.map((option) => (
        <AutoLayout
          key={option.id}
          width={138 * scale}
          height={138 * scale}
          cornerRadius={8 * scale}
          horizontalAlignItems={'center'}
          verticalAlignItems={'end'}
          fill={selectedAvatar === option.id ? headerColor : '#FFFFFF'}
          stroke={selectedAvatar === option.id ? headerColor : '#DADCE2'}
          strokeWidth={selectedAvatar === option.id ? 3 * scale : 2 * scale}
          effect={
            selectedAvatar === option.id
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
          onClick={() => onSelect(option.id, option.svg)} // Pass both id and svg
        >
          <SVG
            src={option.svg}
            width={option.width * scale}
            height={option.height * scale}
          />
        </AutoLayout>
      ))}
    </AutoLayout>
  );
}

widget.register(AvatarRadioButton);
