import { useState } from 'react';
import api from '../api/index';

export default function Users() {

    const [ users, setUsers ] = useState(api.users.fetchAll());

    function handleDeleteUser(userId) {
        setUsers(prev => prev.filter(user => user._id !== userId))
    }

    function renderPhrase(count) {
        if (count === 0) {
            return (<h1 className='badge bg-danger fs-5'>С вами никто не хочет встретится</h1>)
        }
        if (count >= 10 && count < 20) {
            return (<h1 className='badge bg-primary fs-5'>С вами хотят встретится { count.toString() } человек</h1>)
        }
        if (count > 0) {
            switch (count % 10) {
                case 1: return (<h1 className='badge bg-primary fs-5'>С вами хочет встретится { count.toString() } человек</h1>)
                case 2:
                case 3:
                case 4: return (<h1 className='badge bg-primary fs-5'>С вами хотят встретится { count.toString() } человека</h1>)
                case 5:
                case 6:
                case 7:
                case 8:
                case 9: return (<h1 className='badge bg-primary fs-5'>С вами хотят встретится { count.toString() } человек</h1>)
                default: break
            }
        }
       
    }

    function renderUser(user) {
        return (
            <tr key={ user._id }>
                <th scope="row">{ user.name }</th>
                <td>{ user.qualities.map(quality => <span className={`badge bg-${quality.color}`} key={quality._id}>{ quality.name }</span>) }</td>
                <td>{ user.profession.name }</td>
                <td>{ user.completedMeetings.toString() }</td>
                <td>{ user.rate.toString() } / 5</td>
                <td>
                    <button className='btn btn-danger' onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
            </tr>  
        )
    }

    return (
        <>
            { renderPhrase(users.length) }
            { users.length !== 0 && <table className="table" >
                <thead>
                  <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Проффессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                    { users.map((user) => renderUser(user)) }
                </tbody>
            </table> }
        </>
    );
}