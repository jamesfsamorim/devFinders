const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
const USERS_GITHUB_API_URL = 'https://api.github.com/users'

module.exports = {
    async index(req, res) {
        const devs = await Dev.find()

        return res.json(devs)
    },

    async store(req, res) {
        let {github_username, techs, latitude, longitude} = req.body
        const github_response = await axios.get(`${USERS_GITHUB_API_URL}/${github_username}`)
        const {name = login, avatar_url, bio} = github_response.data

        let dev = await Dev.findOne({github_username})

        if (!dev) {
            techs = parseStringAsArray(techs)
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs,
                location
            })
        }

        return res.json(dev)
    }
}