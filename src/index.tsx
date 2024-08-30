const { widget } = figma
const {
  useSyncedState,
  AutoLayout,
  Text,
  SVG,
  Rectangle,
  Frame,
  Input
} = widget

import { PropertyMenu } from "./components/PropertyMenu";
import { Header } from './components/Header'
import { Title } from "./components/Title";
import { CustomInput } from "./components/Input";
import { Counter } from "./components/Counter";
import { AvatarRadioButton } from "./components/AvatarButton";
import { RadioButton } from "./components/Radio";

function Widget() {
  const [headerColor, setHeaderColor] = useSyncedState('headerColor', '#B1BCCC'); // Default: French Gray
  const [widgetSize, setWidgetSize] = useSyncedState('widgetSize', 'Medium'); // Default size
  const [customSVG, setCustomSVG] = useSyncedState('customSVG', '')
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false); // Editing mode for SVG

  PropertyMenu({
    headerColor,
    setHeaderColor,
    widgetSize,
    setWidgetSize,
    setIsEditing,
    setCustomSVG
  });

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

  const scale = widgetSize === 'Small' ? 0.5 : widgetSize === 'Large' ? 1.5 : 1;

  const [selectedValue, setSelectedValue] = useSyncedState("selectedValue", "option1");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <AutoLayout
      direction={'vertical'}
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
      width={'hug-contents'}
      spacing={0}
      padding={16 * scale}
      cornerRadius={28 * scale}
      fill={'#FFFFFF'}
      effect={{
        type: "drop-shadow",
        color: "#00000040",
        offset: {
          x: 4 * scale,
          y: 4 * scale,
        },
        blur: 4 * scale,
      }}
    >
      <Header
        isEditing={isEditing}
        customSVG={customSVG}
        headerColor={headerColor}
        scale={scale}
        setCustomSVG={setCustomSVG}
        setIsEditing={setIsEditing}
      />
      <AutoLayout
        direction={'vertical'}
        horizontalAlignItems={'start'}
        verticalAlignItems={'start'}
        width={'hug-contents'}
        spacing={64 * scale}
        padding={{
          vertical: 24 * scale,
          horizontal: 32 * scale,
        }}
        cornerRadius={20 * scale}
        fill={'#FFFFFF'}
      >
        <Title
          scale={scale}
        />
        <AutoLayout
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'center'}
          width={'hug-contents'}
          spacing={48 * scale}
        >
          <CustomInput
            scale={scale}
          />
          <Counter scale={scale}
          />
        </AutoLayout>
        <AutoLayout
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'center'}
          width={'hug-contents'}
          spacing={48 * scale}
        >
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
          Avatar
        </Text>
      </AutoLayout>
          <AvatarRadioButton
            scale={scale}
          />
          </AutoLayout>
          <AutoLayout direction="vertical" spacing={8} padding={16}>
      <RadioButton
        label="Option 1"
        value="option1"
        selectedValue={selectedValue}
        scale={1} // Adjust scale as needed
        onChange={handleRadioChange}
      />
      <RadioButton
        label="Option 2"
        value="option2"
        selectedValue={selectedValue}
        scale={1}
        onChange={handleRadioChange}
      />
      <RadioButton
        label="Option 3"
        value="option3"
        selectedValue={selectedValue}
        scale={1}
        onChange={handleRadioChange}
      />
    </AutoLayout>
          
        </AutoLayout>
      </AutoLayout>



    </AutoLayout>
  )
}

widget.register(Widget)
