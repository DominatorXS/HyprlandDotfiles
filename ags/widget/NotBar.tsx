import { Widget } from 'astal/gtk3'

export default function BarNot(monitor = 0) {
    const label : string = "Not a strongly typed string i swear"
    return <window className="Bar" monitor={monitor}>
    <box>
        <button onClicked="echo helloww world">{label}</button>
    </box>

</window>
}