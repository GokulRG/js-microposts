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
    const title = (document.querySelector('#title').value).trim();
    const body = (document.querySelector('#body').value).trim();
    const id = (document.querySelector('#id').value).trim();

    if (title === '' || body === '') {
        ui.showAlert('Please fill in all the fields', 'alert alert-danger');
        return;
    }

    const postBody = {
        title, body
    };

    if (ui.formState === 'add' && !id) {
        // Create post request
        const response = await http.post('http://localhost:3000/posts', postBody);
        if (Object.keys(response).length === 2) {
            ui.showAlert('Post Saved Successfully', 'alert alert-success');
            ui.clearFields();
            await getPosts();
        } else {
            ui.showAlert('Unable to save your post', 'alert alert-danger');
        }
    } else if (ui.formState === 'edit' && id) {
        const response = await http.put(`http://localhost:3000/posts/${id}`, postBody);
        if (Object.keys(response).length === 2) {
            ui.showAlert('Post Updated Successfully', 'alert alert-success');
            ui.clearFields();
            await getPosts();
        } else {
            ui.showAlert('Unable to update your post', 'alert alert-danger');
        }
        ui.changeFormState('add');
    }
    
};
// Submit posts to the database
document.querySelector('.post-submit').addEventListener('click', submitPost);

const deleteOrEditPost = async(event) => {
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
    } else if (event.target.parentElement.classList.contains('edit')) {
        const id = event.target.parentElement.dataset.id;
        const body = event.target.parentElement.previousElementSibling.textContent;
        const title = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;

        const data = {
            id,
            body,
            title
        };

        ui.fillForm(data);
    }
};

const cancelEdit = (event) => {
    event.preventDefault();
    if (event.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
};

document.querySelector('#posts').addEventListener('click', deleteOrEditPost);
document.querySelector('.card-form').addEventListener('click', cancelEdit);