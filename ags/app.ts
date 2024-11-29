import { App, Gdk } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import powermenu from "./widget/powermenu"
App.start({
    css: style,
    requestHandler(request: string, res: (response: any) => void) {
        if (request == "powermenu") {
            powermenu()
        }
    },
    main() {
        App.get_monitors().map(Bar)
    },
})
