import { useEffect, useState } from "react"
export default function Main() {

    const intialState=[
        {
            id: "heater-1",
            keyCode: 81,
            key: "Q",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
            id: "heater-2",
            keyCode: 87,
            key: "W",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
            id: "heater-3",
            keyCode: 69,
            key: "E",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
            id: "heater-4",
            keyCode: 65,
            key: "A",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
            id: "clap",
            keyCode: 83,
            key: "S",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
            id: "open-HH",
            keyCode: 68,
            key: "D",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
            id: "Kick-n-Hat",
            keyCode: 90,
            key: "Z",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
            id: "Kick",
            keyCode: 88,
            key: "X",
            url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
            id: "Closed-HH",
            keyCode: 67,
            key: "C",
            url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }


    ]
    const [drumPad, setdrumPad] = useState({pad:intialState,display:""});


    const playClip=(id)=> {
        
        const element = drumPad.pad.filter(item => item.id === id)
        setdrumPad(prev=>{
            return {...prev,display:element[0].id}
       })
       
       
        
        const audio = new Audio(element[0].url);
        audio.play();

    }


    const handleKey=(e)=> {
        
        const element = drumPad.pad.filter(item => item.keyCode === e.keyCode)
        if (element.length===0){return}
        setdrumPad(prev=>{
            return {...prev,display:element[0].id}
        })
        

        let css = document.getElementById(element[0].id)
        css.style.boxShadow = "rgba(250, 150, 193, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"
        const audio = new Audio(element[0].url);
        audio.play();


    }
    const backToStyle=(e)=> {

        const element = drumPad.pad.filter(item => item.keyCode === e.keyCode)
        if (element.length===0){return}
        let css = document.getElementById(element[0].id)
        css.style.boxShadow = "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset"


    }
    
    useEffect(() => {
        document.addEventListener("keydown", handleKey,true)
    
    },[])
    useEffect(() => {
        document.addEventListener("keyup", backToStyle,true)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps

    },[])


    return (
        <div id="drum-machine">
            <div id="display">
                {drumPad.pad.map((item) => {

                    return (<div className="drum-pad" id={item.id} key={item.id}
                        onClick={() => playClip(item.id)} tabIndex="0">
                        <audio className="clip" src={item.url} id={item.key}></audio>
                        {item.key}

                    </div>)

                })}

            </div>
            {drumPad.display&&<h2 className="song">{drumPad.display}</h2>}
        </div>
    )
}