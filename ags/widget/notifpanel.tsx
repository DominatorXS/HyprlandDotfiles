// Work in progres!!!


import Gtk from "gi://Gtk?version=4.0"
import { Button } from "../../../../../usr/share/astal/gjs/gtk3/widget"
import Astal from "gi://Astal?version=3.0"
import { App } from "../../../../../usr/share/astal/gjs/gtk3"
import { Gdk } from "astal/gtk3"
import Mpris from "gi://AstalMpris"
import { bind } from "../../../../../usr/share/astal/gjs"
export default function notifPanel(){
    const {TOP, LEFT, RIGHT, BOTTOM} = Astal.WindowAnchor
    return <window  marginTop={10} marginRight={50} anchor={TOP} name="notifPanel" 
    layer={Astal.Layer.TOP} 
    setup={self => App.add_window(self)}
    className="notifPanel" 
    keymode={Astal.Keymode.EXCLUSIVE} 
    widthRequest={100}
    onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
            }}>
        <box className="mainNotifBox" vertical>
           <box className="musicBox">
                {/* <label>Currently Playing:</label> */}
            </box> 
            <button>GGRRR</button>
        </box>
    </window>
}
function MyButton(name : string, command : string): JSX.Element{
    return <button label={name} onClicked={command}></button>
}


function hide() : void{
    App.get_window("notifPanel")!.hide()
}


// function Media() {
//     const mpris = Mpris.get_default()

//     return <box className="Media">
//         {bind(mpris, "players").as(ps => ps[0] ? (
//             <box>
//                 <box
//                     className="Cover"
//                     valign={Gtk.Align.CENTER}
//                     css={bind(ps[0], "coverArt").as(cover =>
//                         `background-image: url('${cover}');`
//                     )}
//                 />
//                 <label
//                     label={bind(ps[0], "title").as(() =>
//                         `${ps[0].title} - ${ps[0].artist}`
//                     )}
//                 />
//             </box>
//         ) : (
//             ""
//         ))}
//     </box>
// }