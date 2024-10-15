# api.js 사용법

## 1. GET요청 사용 예시

 
```javascript
import React, { useState, useEffect } from "react";
import { get } from "../api/api";

const UserComponent = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = {
    data1:"data1",
    data2:"data2",
  }
  const token = "tokentokentokentokentokentokentoken"
  const headers = {
    Authorization: `Bearer ${token}`
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await get(`/users/${userId}`, params, headers);
        setUser(userData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);
// userId가 있으면 위의 fetchUser 함수가 실행된다는 뜻.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default UserComponent;
```

## 2. POST요청 사용 예시

```javascript
import React, { useState } from "react";
import { post } from "../api/api";

const CreateUserComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const data = {
        name,
        email
      }
      const newUser = await post("/users", data);
      setResponse(newUser);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Create User</button>
      {response && <div>Created User: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default CreateUserComponent;
```

## 3. PATCH 요청 사용 예시

```javascript
import React, { useState } from "react";
import { patch } from "../api/api";

const UpdateUserComponent = ({ userId }) => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
        const data = {
            email
        }
      const updatedUser = await patch(`/users/${userId}`, data);
      setResponse(updatedUser);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Email</button>
      {response && <div>Updated User: {JSON.stringify(response)}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default UpdateUserComponent;
```

## 4. DELETE요청 사용 예시

```javascript
import React, { useState } from "react";
import { deleteRequest } from "../api/api";

const DeleteUserComponent = ({ userId }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      const result = await deleteRequest(`/users/${userId}`);
      setResponse(result);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete User</button>
      {response && (
        <div>User deleted successfully: {JSON.stringify(response)}</div>
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default DeleteUserComponent;
```
