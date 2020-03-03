import { http } from './http';
import { ui } from './ui';

const getPosts = async() => {
    const jsonData = await http.get('http://localhost:3000/posts');
    if (jsonData) {
        ui.showPosts(jsonData);
    } else {
        console.log('An error occurred');
    }
};
// Get posts on dom load
document.addEventListener('DOMContentLoaded', getPosts);

const submitPost = async() => {
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#body').value;

    const postBody = {
        title, body
    };

    // Create post request
    const response = await http.post('http://localhost:3000/posts', postBody);
    if (Object.keys(response).length === 2) {
        ui.showAlert('Post Saved Successfully', 'alert alert-success');
        ui.clearFields();
        await getPosts();
    } else {
        ui.showAlert('Unable to save your post', 'alert alert-danger');
    }
};
// Submit posts to the database
document.querySelector('.post-submit').addEventListener('click', submitPost);

const deletePost = async(event) => {
    event.preventDefault();
    if (event.target.parentElement.classList.contains('delete')) {
        const postId = event.target.parentElement.dataset.id;
        if (confirm('Are you sure you want to delete this post?')) {
            const url = `http://localhost:3000/posts/${postId}`;
            const response = await http.delete(url);
            if (Object.keys(response).length === 0 && response.constructor === Object) {
                ui.showAlert('Post Deleted Successfully', 'alert alert-success');
                ui.clearFields();
                await getPosts();
            } else {
                ui.showAlert('Unable to delete your post. Please try again later', 'alert alert-danger');
            }
        }
    }
};

document.querySelector('#posts').addEventListener('click', deletePost);