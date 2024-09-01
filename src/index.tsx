const { widget } = figma

import { UserPersona } from "./pages/UserPersona";

function Widget() {
  return (
    <UserPersona />
  )
}
widget.register(Widget)
