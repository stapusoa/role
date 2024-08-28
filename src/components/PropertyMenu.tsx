const { widget } = figma
const { usePropertyMenu } = widget;

interface PropertyMenuProps {
  headerColor: string;
  setHeaderColor: (value: string) => void;
  widgetSize: string;
  setWidgetSize: (value: string) => void;
  setIsEditing: (value: boolean) => void;
  setCustomSVG: (value: string) => void;
}

export function PropertyMenu({
  headerColor,
  setHeaderColor,
  widgetSize,
  setWidgetSize,
  setIsEditing,
  setCustomSVG,
}: PropertyMenuProps) {
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
</svg>`,
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
}
