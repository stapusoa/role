const { widget } = figma
const { 
  useSyncedState,
  usePropertyMenu,
  AutoLayout,
  Text,
  SVG,
  Rectangle,
  Frame,
  Input
} = widget

// type IconKey = 'icon1' | 'icon2' | 'icon3'

function Widget() {
  const [headerColor, setHeaderColor] = useSyncedState('headerColor', '#B1BCCC'); // Default: French Gray
  const [widgetSize, setWidgetSize] = useSyncedState('widgetSize', 'Medium'); // Default size
  // const [iconChoice, setIconChoice] = useSyncedState<IconKey>('iconChoice', 'icon1'); // Default icon
  const [customSVG, setCustomSVG] = useSyncedState('customSVG', '')
  const [isEditing, setIsEditing] = useSyncedState('isEditing', false); // Editing mode for SVG

  const defaultSVG = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.22222 0C2.78559 0 0 2.78559 0 6.22222V25.7778C0 29.2144 2.78559 32 6.22222 32H25.7778C29.2144 32 32 29.2144 32 25.7778V6.22222C32 2.78559 29.2144 0 25.7778 0H6.22222ZM17.2756 14.7617C19.0113 16.4974 21.8255 16.4974 23.5612 14.7617C25.2969 13.026 25.2969 10.2118 23.5612 8.47613C21.8255 6.74045 19.0113 6.74045 17.2756 8.47613C15.5399 10.2118 15.5399 13.026 17.2756 14.7617ZM8.47613 23.5612C10.2118 25.2969 13.026 25.2969 14.7617 23.5612C16.4974 21.8255 16.4974 19.0113 14.7617 17.2756C13.026 15.5399 10.2118 15.5399 8.47613 17.2756C6.74045 19.0113 6.74045 21.8255 8.47613 23.5612Z" fill="{headerColor}"/>
</svg>

`;

  {/*
  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        propertyName: 'colorPicker',
        tooltip: 'Header Color',
        selectedOption: headerColor,
        options: [
          { option: '#B1BCCC', label: 'French Gray' },
          { option: '#E38162', label: 'Burnt Sienna' },
          { option: '#FD7B6A', label: 'Salmon' },
          { option: '#FEA869', label: 'Tangerine' },
          { option: '#FFC228', label: 'Amber' },
          { option: '#66D210', label: 'Lawn Green' },
          { option: '#6CE0A9', label: 'Mint' },
          { option: '#469AF3', label: 'Dodger Blue' },
          { option: '#8284F7', label: 'Tropical Indigo' },
          { option: '#F58BBC', label: 'Persian Pink' },
        ],
      },
      {
        itemType: 'dropdown',
        propertyName: 'sizePicker',
        tooltip: 'Widget Size',
        selectedOption: widgetSize,
        options: [
          { option: 'Small', label: 'Small' },
          { option: 'Medium', label: 'Medium' },
          { option: 'Large', label: 'Large' },
        ],
      },
      {
        itemType: 'dropdown',
        propertyName: 'iconPicker',
        tooltip: 'Icon',
        selectedOption: iconChoice,
        options: [
          { option: 'icon1', label: 'Icon 1' },
          { option: 'icon2', label: 'Icon 2' },
          { option: 'icon3', label: 'Icon 3' },
        ],
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === 'colorPicker') {
        setHeaderColor(propertyValue || '#B1BCCC');
      } else if (propertyName === 'sizePicker') {
        setWidgetSize(propertyValue || 'Medium');
      } else if (propertyName === 'iconPicker') {
        setIconChoice(propertyValue as IconKey);
      }
    }
  );
  */}

  usePropertyMenu(
    [
      {
        itemType: 'color-selector',
        propertyName: 'color',
        tooltip: 'Theme',
        selectedOption: headerColor,
        options: [
          { option: '#B1BCCC', tooltip: 'French Gray' },
          { option: '#E38162', tooltip: 'Burnt Sienna' },
          { option: '#FD7B6A', tooltip: 'Salmon' },
          { option: '#FEA869', tooltip: 'Tangerine' },
          { option: '#FFC228', tooltip: 'Amber' },
          { option: '#66D210', tooltip: 'Lawn Green' },
          { option: '#6CE0A9', tooltip: 'Mint' },
          { option: '#469AF3', tooltip: 'Dodger Blue' },
          { option: '#8284F7', tooltip: 'Tropical Indigo' },
          { option: '#F58BBC', tooltip: 'Persian Pink' },
        ],
      },
      {
        itemType: 'dropdown',
        propertyName: 'sizePicker',
        tooltip: 'Widget Size',
        selectedOption: widgetSize,
        options: [
          { option: 'Small', label: 'Small' },
          { option: 'Medium', label: 'Medium' },
          { option: 'Large', label: 'Large' },
        ],
      },
      {
        itemType: 'separator',
      },
      {
        itemType: 'action',
        propertyName: 'changeIcon',
        tooltip: 'Change Icon',
      },
      {
        itemType: 'action',
        propertyName: 'resetSVG',
        tooltip: 'Reset to Default SVG',
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.0081 10.29C17.2229 10.3414 17.4388 10.209 17.4903 9.99419L18.3292 6.4933C18.3807 6.27847 18.2483 6.06258 18.0334 6.0111C17.8186 5.95962 17.6027 6.09205 17.5512 6.30688L16.9866 8.66323C16.9648 8.63065 16.9427 8.59831 16.9203 8.5662C16.2857 7.65689 15.4081 6.93661 14.3806 6.4925C13.1064 5.94173 11.6807 5.8498 10.3463 6.23239C9.01197 6.61497 7.85154 7.44839 7.06277 8.59065C6.274 9.7329 5.90569 11.1133 6.0206 12.4967C6.13551 13.88 6.72653 15.1808 7.69296 16.1772C8.65938 17.1737 9.94142 17.8042 11.3206 17.9614C12.6998 18.1186 14.0909 17.7927 15.2567 17.0392C16.1968 16.4317 16.9435 15.5765 17.4194 14.5749C17.4678 14.4731 17.5134 14.3697 17.5561 14.2649C17.6527 14.0278 17.5167 13.7661 17.2729 13.688C17.0291 13.61 16.7701 13.7454 16.6701 13.9811C16.2751 14.9123 15.609 15.7078 14.7535 16.2606C13.7678 16.8977 12.5917 17.1732 11.4256 17.0403C10.2595 16.9074 9.17553 16.3743 8.35843 15.5318C7.54132 14.6893 7.04162 13.5896 6.94446 12.4199C6.84731 11.2503 7.15871 10.0832 7.82561 9.11742C8.49251 8.15165 9.47364 7.447 10.6018 7.12352C11.73 6.80005 12.9355 6.87777 14.0128 7.34345C14.9478 7.74759 15.736 8.42223 16.2793 9.2755C16.2837 9.28245 16.2882 9.28926 16.293 9.29595L13.6936 8.67308C13.4788 8.6216 13.2629 8.75402 13.2114 8.96886C13.16 9.18369 13.2924 9.39958 13.5072 9.45106L17.0081 10.29Z" fill="#BBBBBB"/>
</svg>
`,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === 'color') {
        setHeaderColor(propertyValue || '#B1BCCC'); // Fallback to default color
      } else if (propertyName === 'sizePicker') {
        setWidgetSize(propertyValue || 'Medium'); // Fallback to default size
      } else if (propertyName === 'changeIcon') {
        setIsEditing(true); // Show the input field to change the icon
      } else if (propertyName === 'resetSVG') {
        setCustomSVG(''); // Reset to default SVG
        setIsEditing(false); // Hide input field when reset
      }
    }
  );

   // Function to apply headerColor as a mask to the SVG
   const applyColorToSVG = (svgString: string, color: string): string => {
    // Replace the fill color in the SVG with the headerColor
    return svgString.replace(/fill=".*?"/g, `fill="${color}"`);
  };

  const scale = widgetSize === 'Small' ? 0.5 : widgetSize === 'Large' ? 1.5 : 1;

  {/*}
  const icons: Record<IconKey, string> = {
    icon1: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.22222C0 2.78578 2.78578 0 6.22222 0H25.7778C29.2142 0 32 2.78578 32 6.22222V25.7778C32 29.2142 29.2142 32 25.7778 32H6.22222C2.78578 32 0 29.2142 0 25.7778V6.22222Z" fill="#FEA869"/><path d="M23.5611 14.7614C21.8254 16.4971 19.0114 16.4971 17.2757 14.7614C15.54 13.0258 15.54 10.2117 17.2757 8.47603C19.0114 6.74037 21.8254 6.74037 23.5611 8.47603C25.2968 10.2117 25.2968 13.0258 23.5611 14.7614Z" fill="white"/><path d="M14.7615 23.561C13.0259 25.2966 10.2118 25.2966 8.47616 23.561C6.74049 21.8253 6.74049 19.0112 8.47616 17.2756C10.2118 15.5399 13.0259 15.5399 14.7615 17.2756C16.4972 19.0112 16.4972 21.8253 14.7615 23.561Z" fill="white"/></svg>`,
    icon2: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28.4444 0H3.53778C1.58222 0 0 1.6 0 3.55556L0.0177778 28.4444C0.0177778 30.4 1.6 32 3.55556 32H21.3333L32 21.3333V3.55556C32 1.6 30.4 0 28.4444 0ZM8.88889 8.88889H23.1111C24.0889 8.88889 24.8889 9.68889 24.8889 10.6667C24.8889 11.6444 24.0889 12.4444 23.1111 12.4444H8.88889C7.91111 12.4444 7.11111 11.6444 7.11111 10.6667C7.11111 9.68889 7.91111 8.88889 8.88889 8.88889ZM14.2222 19.5556H8.88889C7.91111 19.5556 7.11111 18.7556 7.11111 17.7778C7.11111 16.8 7.91111 16 8.88889 16H14.2222C15.2 16 16 16.8 16 17.7778C16 18.7556 15.2 19.5556 14.2222 19.5556ZM19.5556 29.3333V21.3333C19.5556 20.3556 20.3556 19.5556 21.3333 19.5556H29.3333L19.5556 29.3333Z" fill="#66D210"/></svg>`,
    icon3: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6.22222C0 2.78578 2.78578 0 6.22222 0H25.7778C29.2142 0 32 2.78578 32 6.22222V25.7778C32 29.2142 29.2142 32 25.7778 32H6.22222C2.78578 32 0 29.2142 0 25.7778V6.22222Z" fill="#E38162"/><path d="M23.5611 14.7614C21.8254 16.4971 19.0114 16.4971 17.2757 14.7614C15.54 13.0258 15.54 10.2117 17.2757 8.47603C19.0114 6.74037 21.8254 6.74037 23.5611 8.47603C25.2968 10.2117 25.2968 13.0258 23.5611 14.7614Z" fill="white"/><path d="M14.7615 23.561C13.0259 25.2966 10.2118 25.2966 8.47616 23.561C6.74049 21.8253 6.74049 19.0112 8.47616 17.2756C10.2118 15.5399 13.0259 15.5399 14.7615 17.2756C16.4972 19.0112 16.4972 21.8253 14.7615 23.561Z" fill="white"/></svg>`
  };

  */}

  return (
    <AutoLayout
      direction={'vertical'}
      horizontalAlignItems={'start'}
      verticalAlignItems={'start'}
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
          {/*}
          <SVG
            src={icons[iconChoice]}
            width={32 * scale}
            height={32 * scale}
          /> */}

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
          src={applyColorToSVG(customSVG || defaultSVG, headerColor)}
          width={32 * scale}
            height={32 * scale}
          />
        )}
          <Text fontFamily="Inter" fontSize={24 * scale} fontWeight={600} fill={headerColor} horizontalAlignText={'left'}>
          DESIGN ARTIFACTS
        </Text>
        </AutoLayout>
        
        <AutoLayout
          padding={8 * scale}
          cornerRadius={4 * scale}
          fill={headerColor}
        >
          <Text fontFamily="Inter" fontSize={24 * scale} fontWeight={600} fill={'#FFFFFF'} horizontalAlignText={'center'}>1 / 4</Text>
        </AutoLayout>
      </AutoLayout>
      <AutoLayout
        direction={'vertical'}
        horizontalAlignItems={'start'}
        verticalAlignItems={'start'}
        width={'fill-parent'}
        spacing={64 * scale}
        padding={{
          vertical: 24 * scale,
          horizontal: 32 * scale,
        }}
        cornerRadius={20 * scale}
        fill={'#FFFFFF'}
      >
        <AutoLayout
          direction={'horizontal'}
          horizontalAlignItems={'start'}
          verticalAlignItems={'center'}
        >
          <Text fontFamily="Inter" fontSize={44 * scale} fontWeight={600} horizontalAlignText={'left'}>Our Process</Text>
        </AutoLayout>
      </AutoLayout>



    </AutoLayout>
  )
}

widget.register(Widget)
