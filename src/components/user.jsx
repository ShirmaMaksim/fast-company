import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualitie"

const User = ({ _id, name, profession, qualities, completedMeetings, rate, bookmark, onDeleteUser, onToggleBookMark }) => {

    return (
        <tr>
            <th scope="row">{ name }</th>
            <td><Qualities qualities={ qualities } /></td>
            <td>{ profession.name }</td>
            <td>{ completedMeetings.toString() }</td>
            <td>{ rate.toString() } / 5</td>
            <td>
                <button onClick={ () => onToggleBookMark(_id) }><Bookmark active={ bookmark }/></button>
            </td>
            <td>
                <button className='btn btn-danger' onClick={ () => onDeleteUser(_id) }>Delete</button>
            </td>
        </tr>  
    )
};

export default User;