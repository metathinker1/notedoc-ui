const axios = require('axios')

const BASE_URL = 'http://127.0.0.1'
const PORT = '5100'
// 'http://192.168.0.33'
// 'http://192.168.1.31'

class NoteDocument {
    

    getOutlineSummary (name, type, aspect) {
        return new Promise( resolve => {
            const headers = {"Content-Type":"text/html"}
            const params_obj = {params: {name: name, type: type, aspect: aspect, format: "html"}}
            // https://github.com/axios/axios/issues/3821
            //const url = 'http://localhost:5100/notedocsvc/outline/summary'
            const url = BASE_URL + ':' + PORT + '/notedocsvc/outline/summary'
            axios.get(url, params_obj, headers).then(response => {
                resolve(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        })
    }

    getStatusReport (days, beginDate, endDate, entity, entityChildren, work) {
        return new Promise( resolve => {
            const headers = {"Content-Type":"text/html"}
            const children = entityChildren == "on" ? "True" : "False"
            let params_obj = null
            if (days == null || days.length == 0) {
                params_obj = {params: {begin: beginDate, end: endDate, entity, children, work, format: "html"}}
            } else {
                params_obj = {params: {days: days, entity, children, work, format: "html"}}
            }

            const url = BASE_URL + ':' + PORT + '/notedocsvc/statusreport'
            axios.get(url, params_obj, headers).then(response => {
                resolve(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        })
    }

getSearchReport (entityName, entityAspect, entityType, searchTerm)  {
        return new Promise( resolve => {
            const headers = {"Content-Type":"text/html"}
            let post_request_obj = null
            post_request_obj = {entity_name_arg: entityName, entity_aspect_arg: entityAspect, entity_type: entityType, search_term: searchTerm, format: "html"}

            const url = BASE_URL + ':' + PORT + '/notedocsvc/search'
            axios.post(url, post_request_obj, headers).then(response => {
                resolve(response.data)
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })
        })
    }

}

module.exports = NoteDocument
