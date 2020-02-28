import { http } from './http';
import { ui } from './ui';

// Get posts on dom load
document.addEventListener('DOMContentLoaded', async () => {
    const jsonData = await http.get('http://localhost:3000/posts');
    if (jsonData) {
        ui.showPosts(jsonData);
    } else {
        console.log('An error occurred');
    }
});