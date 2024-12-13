import { App } from "astal/gtk3"
import { Variable, GLib, bind } from "astal"
import { Astal, Gtk, Gdk } from "astal/gtk3"
import Hyprland from "gi://AstalHyprland"
import Mpris from "gi://AstalMpris"
import Battery from "gi://AstalBattery"
import Wp from "gi://AstalWp"
import Tray from "gi://AstalTray"
function SysTray() {
    const tray = Tray.get_default()

    return <box>
        {bind(tray, "items").as(items => items.map(item => {
            if (item.iconThemePath)
                App.add_icons(item.iconThemePath)

            const menu = item.create_menu()

            return <button
                tooltipMarkup={bind(item, "tooltipMarkup")}
                onDestroy={() => menu?.destroy()}
                onClickRelease={self => {
                    menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
                }}>
                <icon gIcon={bind(item, "gicon")} />
            </button>
        }))}
    </box>
}

function AudioSlider() {
    const speaker = Wp.get_default()?.audio.defaultSpeaker!

    return <box className="AudioSlider" css="min-width: 110px">
        <icon icon={bind(speaker, "volumeIcon")} />
        <slider 
            hexpand
            onDragged={({ value }) => speaker.volume = value}
            value={bind(speaker, "volume")}
        />
    </box>
}

function BrightnessButton(){
    return <box className="AudioButton">
        <button></button>
    </box>
}

function BatteryLevel() {
    const bat = Battery.get_default()

    return <box className="Battery"
        visible={bind(bat, "isPresent")}>
        <icon icon={bind(bat, "batteryIconName")} />
        <label label={bind(bat, "percentage").as(p =>
            `${Math.floor(p * 100)}%`
        )} />
    </box>
}

function Media() {
    const mpris = Mpris.get_default()

    return <box className="Media">
        {bind(mpris, "players").as(ps => ps[0] ? (
            <box>
                <box
                    className="Cover"
                    valign={Gtk.Align.CENTER}
                    css={bind(ps[0], "coverArt").as(cover =>
                        `background-image: url('${cover}');`
                    )}
                />
                <label
                    label={bind(ps[0], "title").as(() =>
                        `${ps[0].title} - ${ps[0].artist}`
                    )}
                />
            </box>
        ) : (
            ""
        ))}
    </box>
}

function Workspaces() {
    const hypr = Hyprland.get_default()

    return <box className="Workspaces">
        {bind(hypr, "workspaces").as(wss => wss
            .sort((a, b) => a.id - b.id)
            .map(ws => (
                <button
                    className={bind(hypr, "focusedWorkspace").as(fw =>
                        ws === fw ? "focused" : " + ")}
                    onClicked={() => ws.focus()}>
                    {/*  */}
                    {ws.id}
                </button>
            ))
        )}
    </box>
}
function CustomPower(){
    return <box>
        <button onClick={'astal powermenu --instance astal'}>⏻</button>
    </box>
}
function CustomLauncher(){
    return <box className="customLauncher">
        <button onClick={'astal applauncher --instance astal'}>󰣇</button>
    </box>
}
function FocusedClient() {
    const hypr = Hyprland.get_default()
    const focused = bind(hypr, "focusedClient")

    return <box
        className="Focused"
        visible={focused.as(Boolean)}>
        {focused.as(client => (
            client && <label label={bind(client, "title").as(String)} />
        ))}
    </box>
}

    function Time({ format = "%A, %H:%M" }) {
    const time = Variable<string>("").poll(1000, () =>
        GLib.DateTime.new_now_local().format(format)!)

    return <label
        className="Time"
        onDestroy={() => time.drop()}
        label={time()}
    />
}

function NotificationPanel(){
    return <button onClick={'astal notif --instance astal'}></button>
}

export default function Bar(monitor: Gdk.Monitor) {
    const { TOP ,BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        className="Bar"
        gdkmonitor={monitor}
        marginBottom={10}
        marginLeft={150}
        marginRight={150}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={BOTTOM | LEFT | RIGHT}>
        <box className="Bar">
        <eventbox heightRequest={35}></eventbox>
        <centerbox className="Bar">
            <box hexpand halign={Gtk.Align.START}>
                <CustomLauncher/>
                <Workspaces />
            </box>
            <box>
                {/* <Media /> */}
                <Time/>
                <NotificationPanel/>  
            </box>
            <box hexpand halign={Gtk.Align.END} >
                <BrightnessButton/>
                <AudioSlider />
                <BatteryLevel />
                <CustomPower/>
            </box>
        </centerbox>
        </box>
    </window>
}