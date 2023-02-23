import './Updatetask.css'
import React ,{useState} from 'react'
import axios from 'axios'
function Updatetask(props) {
    const [task,setTask] = useState(props.task.todo)
    const updateTask = () => {
        if(task.trim() === '' || props.task.todo === task){
            props.removePopup()
        } else {
            axios.put(`https://todolist-node.vercel.app/api/tasks/${props.task._id}`,{
                _id : props.task._id,
                todo : task,
                isComplete : props.task.isComplete
            },{
                headers : {'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT'}
            }).then(res => {
                props.removePopup()
                props.updatetask(res.data)
            }).catch(err => console.log(err))
        }
    }
    return (
        <div className = 'popup'>
            <div className = 'popup-content'>
                <input type = 'text'  placeholder = 'Update Task . . .' value = {task} onChange = {event => setTask(event.target.value)}/>
                <button onClick = {() => updateTask()}>Update</button>
            </div>
        </div>
    )
}

export default Updatetask