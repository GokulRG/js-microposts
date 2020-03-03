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
    if (response) {
        ui.showAlert('Post Saved Successfully', 'alert alert-success');
        ui.clearFields();
        await getPosts();
    } else {
        console.error('An error occurred while saving your post');
    }
};
// Submit posts to the database
document.querySelector('.post-submit').addEventListener('click', submitPost);