import './Todolist.css'
import React from 'react'
import CheckIcon from '@material-ui/icons/Check'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'
function Todolist(props) {
    const todolist = props.todolist.map((task,index) => {
        const taskComplete = task => {
            axios.put(`https://todolist-node.vercel.app/api/tasks/${task._id}` , {
                _id : task._id,
                todo: task.todo,
                isComplete : !task.isComplete
            },{
                headers : {'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT'}
            }).then(res => props.taskComplete(res.data)).catch(err => console.log(err))
        }
        const removeTask = id => {
            axios.delete(`https://todolist-node.vercel.app/api/tasks/${id}`, {
                headers : {'Content-Type':'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET,OPTIONS,PATCH,DELETE,POST,PUT'}
            }).then(res => props.removeTask(res.data)).catch(err => console.log(err))
        } 
        return <li key = {index}>
            <div style = {{display : 'flex'}}>
               <CheckIcon className = {task.isComplete ? 'isComplete' : 'checkicon'}/>
               <p className = {task.isComplete ? 'taskcomplete' : ''} onClick = {() => {
                   taskComplete(task)
               }}>{task.todo}</p>
            </div>
            <div>
                <EditIcon className = 'edit' onClick = {() => {
                    props.tasktoUpdate(task)
                    props.showPopup()
                }}/>
                <CloseIcon className = 'close' onClick = {() => {
                    removeTask(task._id)
                }}/>
            </div>
        </li>
    })
    return (
        <div className = 'tasklist'>
            <ul>
                {todolist}
            </ul>
        </div>
    )
}

export default Todolist