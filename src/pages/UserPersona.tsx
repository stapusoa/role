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

import { PropertyMenu } from "../components/PropertyMenu";
import { Header } from '../components/Header'
import { Title } from "../components/Title";
import { CustomInput } from "../components/Input";
import { Counter } from "../components/Counter";
import { AvatarRadioButton } from "../components/AvatarButton/AvatarButton";
import { RadioButton } from "../components/Radio";
import { Dropdown } from "../components/Dropdown";
import { Textarea } from "../components/Textarea";
import { Button } from "../components/Button";
import { ArrowIcon } from "../components/Icons";
import { UserPersonaDoc } from "../data/UserPersona/UserPersonaDoc";
import { applyStrokeColorToSVG, applyColorToSVG } from '../components/utils';
import { defaultSVG } from '../components/Icons'
import { avatars } from "../components/AvatarButton/Avatar";

export function UserPersona() {
  const [headerColor, setHeaderColor] = useSyncedState('headerColor', '#B1BCCC');
  const [widgetSize, setWidgetSize] = useSyncedState('widgetSize', 'Medium');
  const [customSVG, setCustomSVG] = useSyncedState('customSVG', '');
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false);
  const [name, setName] = useSyncedState('name', '');
  const [age, setAge] = useSyncedState('age', '18');
  const [role, setRole] = useSyncedState('role', '');
  const [traits, setTraits] = useSyncedState('traits', '');
  const [goals, setGoals] = useSyncedState('goals', '');
  const [frustrations, setFrustrations] = useSyncedState('frustrations', '');
  const [situation, setSituation] = useSyncedState('situation', '');
  const [selectedAvatar, setSelectedAvatar] = useSyncedState('selectedAvatar', 'ammon');
  const [selectedEducation, setSelectedEducation] = useSyncedState('selectedEducation', 'option1');
  const [selectedIndustry, setSelectedIndustry] = useSyncedState('selectedIndustry', 'option1');
  // const [inputValue, setInputValue] = useSyncedState('inputValue', '');
  // const [inputValueNum, setInputValueNum] = useSyncedState('inputValueNum', '18'); // Default to 18 years old
  const [page, setPage] = useSyncedState('page', 1);
  const [showResults, setShowResults] = useSyncedState('showResults', false);

  const widgetId = useWidgetNodeId();
  const scale = widgetSize === 'Small' ? 0.5 : widgetSize === 'Large' ? 1.5 : 1;

  const handleRadioChange = (value: string) => {
    setSelectedEducation(value);
  };

  const handleSelectedOption = (id: string, svg: string) => {
    setSelectedAvatar(id);
    setCustomSVG(svg);  // Set the custom SVG in state
  }

  const options = [
    'Option 1',
    'Option 2',
    'Option 3'];

  const handleOptionChange = (value: string) => {
    setSelectedIndustry(value);
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

  const handleGenerate = async (widgetId: string, name: string, age: string, selectedAvatar: string, customSVG: string) => {
    try {
      const widgetNode = await figma.getNodeByIdAsync(widgetId) as WidgetNode;

      if (widgetNode) {
        const clonedWidget = widgetNode.clone();

        if (clonedWidget) {
          clonedWidget.x = widgetNode.x + widgetNode.width + 50;
          clonedWidget.y = widgetNode.y;
          clonedWidget.visible = true;

          widgetNode.parent!.appendChild(clonedWidget);

          clonedWidget.setWidgetSyncedState({
            name,
            age,
            selectedAvatar,
            customSVG,
            showResults: true
          });

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

  const handleGenerateInfo = async () => {
    setShowResults(true);
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
      {!showResults ? (
        <>

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
                value={name}
                placeholder="e.g., Piper"
                onChange={setName}
              />
              <Counter
                scale={scale}
                label="Age"
                unit="years old"
                value={age} // Pass value here
                min={0}
                max={100}
                customSVG={customSVG}
                buttonColor={headerColor}
                setCustomSVG={setCustomSVG}
                onChange={setAge} // Pass onChange handler here
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
                  options={avatars}
                  selectedAvatar={selectedAvatar}
                  onSelect={handleSelectedOption}
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
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="High school degree / GED"
                      value="option2"
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Professional Certification"
                      value="option3"
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Vocational/Technical Training"
                      value="option4"
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Self-Taught"
                      value="option5"
                      selectedValue={selectedEducation}
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
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Associate Degree"
                      value="option7"
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Bachelor's Degree"
                      value="option8"
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Master's Degree"
                      value="option9"
                      selectedValue={selectedEducation}
                      scale={1 * scale}
                      onChange={handleRadioChange}
                      headerColor={headerColor}
                      setCustomSVG={setCustomSVG}
                      customSVG={customSVG}
                    />
                    <RadioButton
                      label="Doctoral Degree"
                      value="option10"
                      selectedValue={selectedEducation}
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
                selectedValue={selectedIndustry}
                onChange={handleOptionChange}
                headerColor={headerColor}
                setCustomSVG={setCustomSVG}
                customSVG={customSVG}
              />
              <CustomInput
                scale={scale}
                label="Role"
                value={role}
                placeholder="e.g., Member of the Quality Team"
                onChange={setRole}
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
                value={traits}
                placeholder="Describe the user's key traits, e.g., educated, serving, etc."
                onChange={setTraits}
              />
              <Textarea
                scale={scale}
                label="Situation"
                value={situation}
                placeholder="Describe the situation that drives the user to seek the product."
                onChange={setSituation}
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
                value={goals}
                placeholder="Describe the user's goals."
                onChange={setGoals}
              />
              <Textarea
                scale={scale}
                label="What are the points of friction in their life or role?"
                value={frustrations}
                placeholder="Describe the frustrations of the user."
                onChange={setFrustrations}
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
                  onClick={handleGenerateInfo}
                  headerColor={headerColor}
                  customSVG={customSVG}
                  setCustomSVG={setCustomSVG}
                >Save for later</Button>
              </AutoLayout>
              <Button
                scale={scale}
                variant="secondary"
                onClick={() => handleGenerate(widgetId, name, age, selectedAvatar, customSVG)}

                headerColor={headerColor}
                customSVG={customSVG}
                setCustomSVG={setCustomSVG}
                icon={ArrowIcon}
                iconOnly
              />
            </AutoLayout>
          </AutoLayout>
        </>
      ) : (
        <UserPersonaDoc
          name={name}
          age={age}
          role={role}
          traits={traits}
          goals={goals}
          scale={scale}
          headerColor={headerColor}
          education={selectedEducation}
          selectedAvatar={selectedAvatar}
          industry={selectedIndustry}

        />
      )}
    </AutoLayout>
  );
}
