const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;

import { applyStrokeColorToSVG, applyColorToSVG } from './utils';
import { defaultSVG } from './Icons'

interface ButtonProps {
  children?: string; // Text inside the button
  icon?: any; // Icon from your repo
  iconPosition?: 'left' | 'right'; // Position of the icon relative to the text
  scale: number;
  onClick: () => void;
  variant?: 'primary' | 'secondary'; // Button variant
  iconOnly?: boolean; // Whether the button is an icon-only button
  headerColor: string;
  customSVG: string;
  setCustomSVG: (value: string) => void;
}

export function Button({
  children,
  icon,
  iconPosition = 'left',
  scale,
  onClick,
  variant = 'primary',
  iconOnly = false,
  headerColor,
  customSVG,
  setCustomSVG
}: ButtonProps) {
  const primaryStyles = {
    backgroundColor: headerColor || '#007BFF',
    textColor: '#FFFFFF',
    borderColor: headerColor || '#007BFF',
    strokeWidth: 3 * scale
  };

  const secondaryStyles = {
    backgroundColor: '#FFFFFF',
    textColor: headerColor || '#007BFF',
    borderColor: headerColor || '#007BFF',
    strokeWidth: 3 * scale
  };

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <AutoLayout
      direction="horizontal"
      padding={iconOnly ? 12 * scale : { vertical: 16 * scale, horizontal: 24 * scale }}
      spacing={iconOnly ? 0 : 8 * scale}
      cornerRadius={8 * scale}
      stroke={styles.borderColor}
      strokeWidth={styles.strokeWidth}
      fill={styles.backgroundColor}
      verticalAlignItems="center"
      horizontalAlignItems="center"
      width={iconOnly ? 'hug-contents' : undefined} // Use undefined for auto width
      height={'hug-contents'} // Use undefined for auto height
      onClick={onClick}
    >
      {icon && iconPosition === 'left' && (
        <SVG
          src={applyColorToSVG(icon({ width: 24 * scale, height: 24 * scale }), headerColor)}
          width={24 * scale}
          height={24 * scale}
        />
      )}
      {!iconOnly && (
        <Text
          fontFamily="Inter"
          fontSize={24 * scale}
          fontWeight={600}
          letterSpacing={1.5}
          fill={styles.textColor}
          horizontalAlignText="center"
        >
          {children}
        </Text>
      )}
      {icon && iconPosition === 'right' && (
        <SVG
        src={applyColorToSVG(icon({ width: 24 * scale, height: 24 * scale }), headerColor)}
        width={24 * scale}
          height={24 * scale}
        />
      )}
    </AutoLayout>
  );
}
