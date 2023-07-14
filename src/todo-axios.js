import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Todo = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
    };

    const addUser = async () => {
        const newUser = {
            name,
            email,
            phone
        };
        const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
        setUsers([...users, response.data]);
        setName('');
        setEmail('');
    };

    const editUser = async (id) => {
        const updatedUser = {
            name,
            email
        };
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
        const updatedUsers = users.map(user => (user.id === id ? response.data : user));
        setUsers(updatedUsers);
        setName('');
        setEmail('');
    };

    const deleteUser = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    return (
        <div style={{ marginTop: 20 }}>
            <blockquote class="blockquote">
                <h1 class="mb-0" style={{color:'white'}}>CRUD operations with user data</h1>
            </blockquote>




            <form>
                <input className="input-group mb-3 border border-danger  " type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input className="input-group mb-3 border border-warning" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input className="input-group mb-3 border border-info" type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone number" />
                <button type="button" className='btn btn-success' onClick={addUser}>Add User</button>
            </form>
            <div>


                <div class="card">
                    <div class="card-header" style={{ backgroundColor: "#FFC107" }}>
                        users
                    </div>
                    <div class="card-body" style={{ background: "lime" }}>
                        <ul class="list-group" >
                            {users.map((user, index) => (
                                <li key={index.id} className='list-group-item' style={{ backgroundColor: "skyblue" }}>
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Mobile:</strong> {user.phone}</p>
                                    <button style={{ marginRight: 20 }} type="button" className='btn btn-dark' onClick={() => editUser(user.id)}>Edit</button>
                                    <button type="button" className='btn btn-danger' onClick={() => deleteUser(user.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Todo;
