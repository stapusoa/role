const { widget } = figma
const {
  useSyncedState,
  AutoLayout,
  Text,
  SVG,
  Rectangle,
  Frame,
  Input,
  useWidgetId,
  useWidgetNodeId
} = widget

import { PropertyMenu } from "./components/PropertyMenu";
import { Header } from './components/Header'
import { Title } from "./components/Title";
import { CustomInput } from "./components/Input";
import { Counter } from "./components/Counter";
import { AvatarRadioButton } from "./components/AvatarButton";
import { RadioButton } from "./components/Radio";
import { Dropdown } from "./components/Dropdown";
import { Textarea } from "./components/Textarea";
import { Button } from "./components/Button";
import { ArrowIcon } from "./components/Icons";





function Widget() {
  const [headerColor, setHeaderColor] = useSyncedState('headerColor', '#B1BCCC'); // Default: French Gray
  const [widgetSize, setWidgetSize] = useSyncedState('widgetSize', 'Medium'); // Default size
  const [customSVG, setCustomSVG] = useSyncedState('customSVG', '')
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false); // Editing mode for SVG
  const [inputValue, setInputValue] = widget.useSyncedState('inputValue', '');
  const [page, setPage] = useSyncedState('page', 1);
  const [savedDocs, setSavedDocs] = useSyncedState('savedDocs', []);
  const [generatedDocs, setGeneratedDocs] = useSyncedState('generatedDocs', []);
  const widgetId = useWidgetNodeId()

  const scale = widgetSize === 'Small' ? 0.5 : widgetSize === 'Large' ? 1.5 : 1;

  const [selectedValue, setSelectedValue] = useSyncedState("selectedValue", "option1");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

  const [selectedOption, setSelectedOption] = useSyncedState('selectedOption', '');

  const options = [
    'Option 1',
    'Option 2',
    'Option 3'];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  PropertyMenu({
    headerColor,
    setHeaderColor,
    widgetSize,
    setWidgetSize,
    setIsEditing,
    setCustomSVG
  });

  const handleButtonClick = () => {
    console.log('Button clicked');
  };

  const handleDuplicate = async (widgetId: string) => {
    try {
      const widgetNode = await figma.getNodeByIdAsync(widgetId) as WidgetNode;
      
      if (widgetNode) {
        // Clone the current widget instance
        const clonedWidget = widgetNode.clone();

        if (clonedWidget) {
          // Position the new widget instance
          clonedWidget.x = widgetNode.x + widgetNode.width + 50;
          clonedWidget.y = widgetNode.y;

          // Ensure the cloned widget is visible
          clonedWidget.visible = true;

          // Append the cloned widget to the same parent (the canvas)
          widgetNode.parent!.appendChild(clonedWidget);

          // Scroll the viewport to the new widget instance
          figma.viewport.scrollAndZoomIntoView([clonedWidget]);
        } else {
          console.error('Widget cloning failed: clonedWidget is null');
        }
      } else {
        console.error('Failed to find widget node by ID');
      }
    } catch (error) {
      console.error('Error retrieving the widget node:', error);
    }
  };
  
  
  
  

  const handleNextPage = () => {
    // Navigate to the next page within the widget
    setPage(page + 1);
  };
  

  return (
    // main frame
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
      <AutoLayout // content
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
        <AutoLayout // row
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'center'}
          width={'hug-contents'}
          spacing={48 * scale}
        >
          <CustomInput
            scale={scale}
            label="User Name"
            value={inputValue}
            placeholder="e.g., Piper"
            onChange={setInputValue}
          />
          <Counter
            scale={scale}
            label="Age"
            unit="years old"
            min={0}
            max={100}
            initialValueNum={18}
            customSVG={customSVG}
            buttonColor={headerColor}
            setCustomSVG={setCustomSVG}
          />
        </AutoLayout>
        <AutoLayout // row
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'start'}
          width={'fill-parent'}
          spacing={48 * scale}
        >
          <AutoLayout
            direction={'vertical'}
            horizontalAlignItems={'start'}
            verticalAlignItems={'start'}
            spacing={8 * scale}
            width={'fill-parent'}
          >
            <AutoLayout
              direction={'horizontal'}
              padding={{
                horizontal: 0,
                vertical: 4 * scale,
              }}
              width={'fill-parent'}
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
              customSVG={customSVG}
              headerColor={headerColor}
              setCustomSVG={setCustomSVG}
            />
          </AutoLayout>
          <AutoLayout
            direction={'vertical'}
            horizontalAlignItems={'start'}
            verticalAlignItems={'start'}
            spacing={8 * scale}
            width={'fill-parent'}
          >
            <AutoLayout
              direction={'horizontal'}
              horizontalAlignItems={'start'}
              verticalAlignItems={'start'}
              padding={{
                horizontal: 0,
                vertical: 4 * scale,
              }}
              width={'fill-parent'}
              height={'hug-contents'}
            >
              <Text
                fontFamily="Inter"
                fontSize={24 * scale}
                fontWeight={500}
                horizontalAlignText={'left'}
                fill={'#636366'}
              >
                Education
              </Text>
            </AutoLayout>
            <AutoLayout // columns
              direction={'horizontal'}
              spacing={8 * scale}
              width={'fill-parent'}
              horizontalAlignItems={'start'}
              verticalAlignItems={'start'}
            >
              <AutoLayout // column
                direction="vertical" spacing={8 * scale} padding={0} horizontalAlignItems={'start'} verticalAlignItems={'start'} width={'fill-parent'}>
                <RadioButton
                  label="No degree"
                  value="option1"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="High school degree / GED"
                  value="option2"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Professional Certification"
                  value="option3"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Vocational/Technical Training"
                  value="option4"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Self-Taught"
                  value="option5"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
              </AutoLayout>
              <AutoLayout // column
                direction="vertical" spacing={8 * scale} padding={0} horizontalAlignItems={'start'} verticalAlignItems={'start'} width={'hug-contents'}>
                <RadioButton
                  label="Some college"
                  value="option6"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Associate Degree"
                  value="option7"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Bachelor's Degree"
                  value="option8"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Master's Degree"
                  value="option9"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
                <RadioButton
                  label="Doctoral Degree"
                  value="option10"
                  selectedValue={selectedValue}
                  scale={1 * scale}
                  onChange={handleRadioChange}
                  headerColor={headerColor}
                  setCustomSVG={setCustomSVG}
                  customSVG={customSVG}
                />
              </AutoLayout>
            </AutoLayout>
          </AutoLayout>

        </AutoLayout>
        <AutoLayout // row
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'start'}
          width={'hug-contents'}
          spacing={48 * scale}
        >
          <Dropdown
            scale={scale}
            label="What industry do they work in?"
            options={options}
            placeholder="Select an industry"
            selectedValue={selectedOption}
            onChange={setInputValue}
            headerColor={headerColor}
            setCustomSVG={setCustomSVG}
            customSVG={customSVG}
          />
          <CustomInput
            scale={scale}
            label="Role"
            value={inputValue}
            placeholder="e.g., Member of the Quality Team"
            onChange={setInputValue}
          />
        </AutoLayout>
        <AutoLayout // row
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'start'}
          width={'hug-contents'}
          spacing={48 * scale}
        >
          <Textarea
            scale={scale}
            label="Characteristics"
            value={inputValue}
            placeholder="Describe the user's key traits, e.g., educated, serving, etc."
            onChange={setInputValue}
          />
          <Textarea
            scale={scale}
            label="Situation"
            value={inputValue}
            placeholder="Describe the situation that drives the user to seek the product."
            onChange={setInputValue}
          />
        </AutoLayout>
        <AutoLayout // row
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'start'}
          width={'hug-contents'}
          spacing={48 * scale}
        >
          <Textarea
            scale={scale}
            label="What are the goals of the user?"
            value={inputValue}
            placeholder="Describe the user's goals."
            onChange={setInputValue}
          />
          <Textarea
            scale={scale}
            label="What are the points of friction in their life or role?"
            value={inputValue}
            placeholder="Describe the frustrations of the user."
            onChange={setInputValue}
          />
        </AutoLayout>
        <AutoLayout // actions
          direction={'horizontal'}
          horizontalAlignItems={'center'}
          verticalAlignItems={'start'}
          spacing={'auto'}
          width={'fill-parent'}
          height={'hug-contents'}
        >
          <AutoLayout
            direction={'horizontal'}
            horizontalAlignItems={'start'}
            verticalAlignItems={'center'}
            spacing={24 * scale}
            width={'hug-contents'}
            height={'hug-contents'}
          >
            <Button
              scale={scale}
              variant="primary"
              onClick={() => {
                const widgetNode = figma.getNodeById(widgetId) as WidgetNode;
        const clonedWidget = widgetNode.clone();

        // Position the cloned widget beside this widget
        widgetNode.parent!.appendChild(clonedWidget);
        clonedWidget.x = widgetNode.x + widgetNode.width + 50;
        clonedWidget.y = widgetNode.y;
              }}
              headerColor={headerColor}
              customSVG={customSVG}
              setCustomSVG={setCustomSVG}
            >Generate</Button>
            <Button
              scale={scale}
              variant="secondary"
              onClick={() => handleDuplicate(widgetId)}
              headerColor={headerColor}
              customSVG={customSVG}
              setCustomSVG={setCustomSVG}
            >Save for later</Button>
          </AutoLayout>
          <Button
            scale={scale}
            variant="secondary"
            onClick={() => handleButtonClick()}
            headerColor={headerColor}
            customSVG={customSVG}
            setCustomSVG={setCustomSVG}
            icon={ArrowIcon}
            iconOnly
          />
        </AutoLayout>
      </AutoLayout>



    </AutoLayout>
  )
}

widget.register(Widget)
