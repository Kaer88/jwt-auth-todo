import { useContext, useState } from "react"
import todoServices from "../services/todoServices"
import { authContext } from "../contexts/authContext"

export default function NewTodo({ setTodos, todos, topics, updateTodos }) {

    const { authenticatedUser } = useContext(authContext)
    const [inputState, setInputState] = useState({
        text: "",
        topicid: "",
    })

    const handleInputChange = (e) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    const sendTodo = () => {
        try {
            todoServices.sendTodo(inputState, authenticatedUser)
                .then(() => {
                    updateTodos()
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <label>Topic:</label>
            <select onChange={handleInputChange} value={inputState.category} name="topicid">
                <option></option>
                {
                    topics.map(topic => <option key={topic.id} value={topic.id}>{topic.name}</option>)
                }
            </select>
            <label>todo text:</label>
            <textarea name="text" onChange={handleInputChange} value={inputState.text}></textarea>
            <button onClick={sendTodo}>Create</button>
        </div>
    )

}