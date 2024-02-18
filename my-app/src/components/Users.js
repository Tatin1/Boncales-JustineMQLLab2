import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchBar from './search';

function Users() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(res => {
        setData(res.data);
        setFilteredData(res.data); // Set the initial filtered data to all data
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Filter the data array based on the searchTerm
    const filtered = data.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.age.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/deleteuser/' + id)
      .then(res => {
        console.log(res);
        // Filter out the deleted user from the data array
        const updatedData = data.filter(user => user._id !== id);
        // Update the data state with the filtered array
        setData(updatedData);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <div className="bg-white rounded p-3 text-center mb-4 mx-auto">
          <h1>User Management System</h1>
        </div>
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                  <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;