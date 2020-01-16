const axios = require('axios');
const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray')
//index(lista), show(unico), store, update, destroy

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        
        let devCheck = await Dev.findOne({ github_username });

        if (!devCheck){
                        //await aguarda uma resposta da api
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArrays = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            devCheck = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArrays,
                location,
            })
        }
            
        return response.json(devCheck);//Enviando um objeto via JSON
    }
}