import axios from 'axios';


export default class Service {
    static async getLostAnimals(data) {
        try {
            const posts = await axios.get('http://localhost:3001/posts/', { params: data })
            return posts.data
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
            const response = await axios.put('http://localhost:3001/users/' + id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteUser(id) {
        try {
            const response = await axios.delete('http://localhost:3001/users/' + id)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async updatePersonalData(id, data) {
        try {
            const response = await axios.get('http://localhost:3001/users/update' + id, data)
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getMyFavourites(id) {
        try {
            const favourites = await axios.get('http://localhost:3001/post_favourites/my-favourites/' + id)
            return favourites.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async getMyPosts(id) {
        try {
            const posts = await axios.get('http://localhost:3001/posts/my-posts/' + id)
            return posts.data
        } catch (error) {
            console.log(error)
        }
    }

    static async addToFavourites(post_id, user_id) {
        try {
            const response = await axios.post('http://localhost:3001/post_favourites/create', { post_id, user_id })
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deleteFromFavourites(id) {
        try {
            const response = await axios.delete('http://localhost:3001/post_favourites/' + id)
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async addPost(data) {
        try {
            const response = await axios.get('http://localhost:3001/posts/create', data)
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async updatePost(post_id, data) {
        try {
            const response = await axios.put('http://localhost:3001/posts/update' + post_id, data)
            return response.data
        } catch (error) {
            console.log(error)
        }
        
    }

    static async deletePost(post_id) {
        try {
            const response = await axios.delete('http://localhost:3001/posts/' + post_id)
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