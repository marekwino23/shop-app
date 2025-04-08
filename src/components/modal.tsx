import { PropsWithChildren } from "react"
import ReactDOM from "react-dom"

export const Modal = ({ children }: PropsWithChildren) => {
    return ReactDOM.createPortal(children,document.body );
}