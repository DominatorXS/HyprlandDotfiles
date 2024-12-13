import { App, Gdk } from "astal/gtk3"
import style from "./style.scss"
import Bar from "./widget/Bar"
import powermenu from "./widget/powermenu"
import Applauncher from "./widget/applauncher"
import notifPanel from "./widget/notifpanel" 
App.start({
    css: style,
    requestHandler(request: string, res: (response: any) => void) {
        if (request == "powermenu") {
            powermenu()
        }
        if(request == "applauncher"){
            Applauncher()
        }
        if(request == "notif"){
            notifPanel()
        }

    },
    main() {
        App.get_monitors().map(Bar)  // summon the bar
    },
})
