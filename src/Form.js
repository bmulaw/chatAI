import { useState } from "react";
import "./Form.css"

const Form = () => {

    const [text, setText] = useState("")
    const [res, setRes] = useState([])
    const [history, setHistory] = useState([])
    
    const callAPI = () => {
        // configurations for API request
        const starterPrompt = `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: ${text} \nA:`
        const API_KEY = "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"
        const data = {
            prompt: starterPrompt,
            temperature: 0,
            max_tokens: 100,
            top_p: 1,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            stop: ["\n"],
        };
        
        // calling the API
        fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then(data2 => {
            // main logic is here
            let answer = data2.choices[0].text
            console.log(data2)
            if (answer === " Unknown" || answer === "") { answer = "idk" }
            let now = new Date();
            let time = now.getHours() + ":" + ("0" + now.getMinutes()).slice(-2) 
            setHistory([...history, [{text, answer, time}]])
            console.log(history)
        })
    }

    // handle changes to the form
    const handleChange = (event) => {
        setText(event.target.value)
    }
    // handle changes to the form
    const handleSubmit = (event) => {
        event.preventDefault()
        callAPI()
        setText('')
    }

    return(
        // just HTML - JSX
        <div className="chat">
            <h1>Ask me anything!</h1>
            {/* need to learn the .map() in JavaScript */}
            {history.map((hist, index) => 
                <div key={index}>
                 <div className="mine messages">
                    <div className="message last">{hist[0].text}</div>
                 </div>

                 <div className="yours messages">
                    <div className="message">{hist[0].answer}</div>
                </div>
                    <h6 className="time" style={{color:'gray', marginTop: "0px", marginLeft: "5px"}}>{hist[0].time}</h6>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="" value={text} onChange={handleChange} />
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Form;