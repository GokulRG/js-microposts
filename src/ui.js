class UI {
    constructor() {
        this.posts = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts) {
        let output = '';

        posts.forEach(post => {
            output += `
                <div class='card mb-3'>
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-pencil"></i></a>
                        <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-remove"></i></a>
                    </div>
                </div>
            `;
        });

        this.posts.innerHTML = output;
    }

    showAlert(message, className) {
        this.clearAlert();
        // Create our alert div
        const div = document.createElement('div');
        div.className = className;
        //Create a text node child and append it to the div
        div.appendChild(document.createTextNode(message));
        //Get parent to insert it into the DOM
        const container = document.querySelector('.postsContainer');
        // Get posts
        const posts = document.querySelector('#posts');
        // Insert alert div
        container.insertBefore(div, posts);
        // Time out
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = "";
        this.bodyInput.value = "";
        this.idInput.value = "";
    }

    clearIdInput() {
        this.idInput.value = "";
    }

    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }
    
    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';
            // Add a cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));
            //Get Parent
            const cardForm = document.querySelector('.card-form');
            // Get const form end element
            const formEnd = document.querySelector('.form-end');
            // Insert the cancel button
            cardForm.insertBefore(button, formEnd);
            this.formState = 'edit';
        } else if (type === 'add') {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';

            // Remove Cancel button if present
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            // Clear ID from Inner Field
            this.clearIdInput();
            this.clearFields();
            this.clearAlert();
            this.formState = 'add';
        } else {
            // do nothing
        }
    }
}

export const ui = new UI();