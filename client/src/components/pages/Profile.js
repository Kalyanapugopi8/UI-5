import '../../App.css';
import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Profile = (props) => {
    const location = useLocation();

    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        content: '',
        createdAt: '',
        locations: ''
    });

    const { title, content, createdAt, locations } = post;

    const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault();
        const id = location.state.id;
        const username = location.state.name;
        fetchData("/post/createpost",
            {
                id,
                title,
                content,
                createdAt,
                locations
            },
            "POST")
            .then((data) => {
                if (!data.message) {
                    console.log(data)
                    fetchData("/post/getpost",
                        {
                            id
                        },
                        "POST")
                        .then((info) => {
                            console.log(info);
                            if (!info.message) {
                                setPost({
                                    title: '',
                                    content: '',
                                    createdAt: '',
                                    locations: ''
                                });
                                navigate("/profile", { state: { id: id, name: username, data: info } });
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    let createdPosts = [];

    for (let i = 0; i < Object.keys(location.state.data).length; i++) {
        createdPosts.push({
            title: location.state.data[i].title,
            content: location.state.data[i].content,
            createdAt: location.state.data[i].createdAt,
            locations: location.state.data[i].locations
        });
    }

    return (
        <div className="container mt-5 login">
            <h1 className="h1-main">Hi, {location.state.name}!</h1>
            <h3 className='text-underline'>Your Posts</h3>
            {createdPosts.map(cont => (
                <div className='user-post'>
                    <h4>{cont.title}</h4>
                    <p className='post-cotent'>{cont.content}</p>
                    <p className='post-cotent'><em>{cont.createdAt}</em></p>
                    <p className='post-cotent'>{cont.locations}</p>
                    <br />
                </div>
            ))}
            <div className="user-form">
                <form onSubmit={onSubmit}>
                    <h2>Create a Post</h2>
                    <p>What's on your mind?</p>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Title of your post'
                            id="title"
                            name='title'
                            onChange={onChange}
                            value={title}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="content"
                            name='content'
                            placeholder='Your content goes here'
                            onChange={onChange}
                            value={content}
                            required>
                        </textarea>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder='Set Post Date'
                                    id="createdAt"
                                    name='createdAt'
                                    onChange={onChange}
                                    value={createdAt}
                                    required />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Location?'
                                    id="locations"
                                    name='locations'
                                    onChange={onChange}
                                    value={locations}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;