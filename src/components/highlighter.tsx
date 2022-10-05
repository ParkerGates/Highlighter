import React, { useState, useEffect} from "react";
import '../App.css';

export default function Highlighter() {
    const [text, setText] = useState("");
    const [html, setHtml] = useState("");
    const textBoxChange = () => {
        setText(String(document.getElementById("ce")?.textContent));
        setHtml(String(document.getElementById("ce")?.innerHTML));
    }

    const btnAction = (hdata: Selection | null) => {
        //CHECK IF HIGHLIGHTED SECTION IS INSIDE EDITABLE DIV
        if (hdata === null) return
        const htext: string = hdata.toString()
        const startIndex = hdata.anchorOffset;
        const startText : string|null|undefined = hdata?.anchorNode?.nodeValue;

        console.log(hdata);
        let selected: any = hdata.focusNode;
        if (selected.nodeValue === startText) {}
        else {
            selected = selected?.previousSibling
            for (let i = 0; i < 10; i++) {
                console.log(i, selected.innerText, startText);
                if (selected?.innerText === startText) break;
                selected = selected?.previousSibling;
            }
            console.log("OUT!", selected.innerText, startText, selected);
        }
    }

    // red
    // blue
    // green
    // yellow
    // pink





    //HTML-Print-Out==============================================
    useEffect(() => {
        setText(String(document.getElementById("ce")?.textContent));
        setHtml(String(document.getElementById("ce")?.innerHTML));
        document.getElementById("ce")?.addEventListener("input", textBoxChange, false);
        
        return () => {
          document.removeEventListener("mousedown", textBoxChange, false);  
        }
    }, []);

    return(
        <div>
            <br />
            <div
                id="ce"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onChange={textBoxChange}
                style={{fontSize:"3rem"}}>
                Hello, this is <b>Parker</b> <i>Gates</i> Is content editable divs really possible
            </div>
            <br />

            <hr />
            <button onClick={() => btnAction(window.getSelection())} style={{ fontSize: "2rem"}}>Mark</button>
            <hr />

            <h3>Text:</h3>
            <div>{text}</div>

            <h3>HTML:</h3>
            <div>{html}</div>
        </div>
    );
}