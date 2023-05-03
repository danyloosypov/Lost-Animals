import axios from 'axios';


export default class Service {


    static getToken() {
        const cookieValue = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .find(([key, value]) => key.trim() === 'token');
        const token = cookieValue ? cookieValue[1] : null;
        return token;
    }
    
    static getConfig() {
        const token = Service.getToken();
        return {
            headers: { Authorization: `${token}` }
        };
    }

    static async getLostAnimals(data) {
        try {
            const posts = await axios.get('http://localhost:3001/posts/', { params: data })
            return posts.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getUsers() {
        try {
            const users = await axios.get('http://localhost:3001/users/', Service.getConfig())
            return users.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deleteUserFromAdmin(id) {
        try {
            const users = await axios.delete('http://localhost:3001/users/delete/' + id, Service.getConfig())
            return users.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getAnimals() {
        try {
            const animals = await axios.get('http://localhost:3001/animals/', Service.getConfig())
            return animals.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getAnimal(id) {
        try {
            const animals = await axios.get('http://localhost:3001/animals/' + id, Service.getConfig())
            return animals.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async addAnimal(data) {
        try {
            const animals = await axios.post('http://localhost:3001/animals/create', data, Service.getConfig())
            return animals.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async updateAnimal(id, data) {
        try {
            const animals = await axios.put('http://localhost:3001/animals/update/' + id, data, Service.getConfig())
            return animals.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deleteAnimal(id) {
        try {
            const animals = await axios.delete('http://localhost:3001/animals/delete/' + id, Service.getConfig())
            return animals.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getFoundAnimals(data) {
        try {
            const posts = await axios.get('http://localhost:3001/posts/', { params: data })
            return posts.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getPersonalData(id) {
        try {
            const response = await axios.get('http://localhost:3001/users/' + id, Service.getConfig())
            console.log("sdfsfs", response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteUser(id) {
        try {
            const response = await axios.delete('http://localhost:3001/users/delete/' + id, Service.getConfig())
            alert(response.data.message)
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Delete the token cookie
            document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            return response.data.message
        } catch (error) {
            console.log(error)
        }
    }

    static async updatePersonalData(id, data) {
        try {
            const response = await axios.put('http://localhost:3001/users/update/' + id, data, Service.getConfig())
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getMyFavourites(id) {
        try {
            const favourites = await axios.get('http://localhost:3001/post_favourites/my-favourites/' + id, Service.getConfig())
            return favourites.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getMyPosts(id) {
        try {
            const posts = await axios.get('http://localhost:3001/posts/my-posts/' + id, Service.getConfig())
            return posts.data
        } catch (error) {
            console.log(error)
        }
    }

    static async addToFavourites(post_id, user_id) {
        try {
            const response = await axios.post('http://localhost:3001/post_favourites/create', { post_id, user_id }, Service.getConfig())
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deleteFromFavourites(post_id, user_id) {
        try {
          const response = await axios.delete(`http://localhost:3001/post_favourites/${post_id}/${user_id}`, Service.getConfig());
          return response.data;
        } catch (error) {
          console.log(error);
        }
    }

    static async addPost(data) {
        try {
            const response = await axios.post('http://localhost:3001/posts/create', data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  ...Service.getConfig().headers,
                },
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async updatePost(post_id, data) {
        try {
            const response = await axios.put('http://localhost:3001/posts/update/' + post_id, data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  ...Service.getConfig().headers,
                },
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deletePost(post_id) {
        try {
            const response = await axios.delete('http://localhost:3001/posts/delete/' + post_id, Service.getConfig())
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getPost(id) {
        try {
            const response = await axios.get('http://localhost:3001/posts/' + id)
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

}