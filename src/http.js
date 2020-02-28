/**
 * EasyHTTP Library
 * Library for Making HTTP Requests
 *
 * @version 2.0.0
 * @author Gokul Kramnik
 * @license MIT
 */

class EasyHTTP {

    //GET Method
    async get(url) {
        const response = await fetch(url);

        const data = response.json();

        return data;
    }

    //POST
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const res = response.json();

        return data;
    }

    //PUT
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const res = response.json();

        return data;
    }

    //DELETE
    async delete(url) {
        const response = await fetch(url);

        const data = response.json();

        return data;
    }
}

export const http = new EasyHTTP();