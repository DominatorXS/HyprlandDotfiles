// Work in progres!!!


import {Gtk} from "astal/gtk3"
import Astal from "gi://Astal?version=3.0"
import { App } from "../../../../../usr/share/astal/gjs/gtk3"
import { Gdk } from "astal/gtk3"
import Mpris from "gi://AstalMpris"
import { bind } from "../../../../../usr/share/astal/gjs"

function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}
export default function notifPanel(){
    const mpris = Mpris.get_default()
    const {TOP, LEFT, RIGHT, BOTTOM} = Astal.WindowAnchor
    return <window  marginTop={0} marginRight={50} anchor={BOTTOM} name="notifPanel" 
    layer={Astal.Layer.TOP} 
    setup={self => App.add_window(self)}
    className="notifPanel" 
    keymode={Astal.Keymode.EXCLUSIVE} 
    widthRequest={300}
    onKeyPressEvent={function (self, event: Gdk.Event) {
            if (event.get_keyval()[1] === Gdk.KEY_Escape)
                self.hide()
            }}>
        <box className="mainNotifBox" vertical>
            <eventbox widthRequest={300}></eventbox>
           <box className="musicBox" vertical>
             {bind(mpris, "players").as(arr => arr.map(player => (
            <Media player={player} />
        )))}
            </box> 
            {/* <eventbox heightRequest={100}/> */}
        </box>
    </window>
}
function MyButton(name : string, command : string): JSX.Element{
    return <button label={name} onClicked={command}></button>
}


function hide() : void{
    App.get_window("notifPanel")!.hide()
}


function Media( {player} : {player : Mpris.Player}) {
    const mpris = Mpris.get_default()
    const artist = bind(player, "artist").as(a =>
        a || "Unknown Artist")
    const {START, END, CENTER} = Gtk.Align
    const position = bind(player, "position").as(p => player.length > 0
        ? p / player.length : 0)
    return <box className="Media" halign={CENTER} vertical>
        {bind(mpris, "players").as(ps => ps[0] ? (
            <box vertical>
                <box
                    className="Cover"
                    // valign={Gtk.Align.CENTER}
                    css={bind(ps[0], "coverArt").as(cover =>
                        `background-image: url('${cover}');`
                    )}
                />
                <label
                    label={bind(ps[0], "title").as(() =>
                        ` ${ps[0].title} - ${ps[0].artist}`
                    )} wrap/>

                <slider visible={bind(player, "length").as(l => l > 0)} value={position}
                    onDragged={({ value }) => player.position = value * player.length}></slider>
            </box>
        ) : (
            "Nothing playing"
        ))}
        <box>
                <label
                    hexpand
                    className="position"
                    halign={START}
                    visible={bind(player, "length").as(l => l > 0)}
                    label={bind(player, "position").as(lengthStr)}
                />
                <label
                    className="length"
                    hexpand
                    halign={END}
                    visible={bind(player, "length").as(l => l > 0)}
                    label={bind(player, "length").as(l => l > 0 ? lengthStr(l) : "0:00")}
                /> 
        </box>
    </box>
}

