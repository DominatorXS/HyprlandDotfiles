import Gtk from "gi://Gtk?version=4.0"
import { Button } from "../../../../../usr/share/astal/gjs/gtk3/widget"
import Astal from "gi://Astal?version=3.0"
import { App } from "../../../../../usr/share/astal/gjs/gtk3"
import { Gdk } from "astal/gtk3"
export default function powermenu(){
    const {TOP, LEFT, RIGHT, BOTTOM} = Astal.WindowAnchor
    return <window  marginBottom={0} marginRight={50} anchor={BOTTOM | RIGHT} name="powermenu" layer={Astal.Layer.TOP} setup={self => App.add_window(self)}className="PowerMenu" keymode={Astal.Keymode.EXCLUSIVE} onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
            }}>
        <box className="Shadow">
            {MyButton(" ⏻ ", 'systemctl poweroff')}
            {MyButton(" 󰍃 ", "hyprctl dispatch exit")}
            {MyButton("  ", "echo lockscreen not made yet")}
        </box>
    </window>
}
function MyButton(name : string, command : string): JSX.Element{
    return <button label={name} onClicked={command}></button>
}


function hide() : void{
    App.get_window("PowerMenu")!.hide()
}
