import Gtk from "gi://Gtk?version=4.0"
import { Button } from "../../../../../usr/share/astal/gjs/gtk3/widget"
import Astal from "gi://Astal?version=3.0"
import { App } from "../../../../../usr/share/astal/gjs/gtk3"
import { Gdk } from "astal/gtk3"
export default function powermenu(){
    return <window name="powermenu" setup={self => App.add_window(self)}className="PowerMenu" keymode={Astal.Keymode.ON_DEMAND} onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
            }}>
        <box vertical>
            <label className="message" label="Choose wisely, Silver-sama."></label>
            {MyButton(" ⏻ Shut Down", 'systemctl poweroff')}
            {MyButton(" 󰍃 Logout Hyprland", "hyprctl dispatch exit")}
            {MyButton("  Lockscreen", "echo lockscreen not made yet")}

        </box>
    </window>
}
function MyButton(name : string, command : string): JSX.Element{
    return <button label={name} onClicked={command}></button>
}


function hide() : void{
    App.get_window("PowerMenu")!.hide()
}
