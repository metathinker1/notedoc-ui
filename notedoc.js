const axios = require('axios')


class NoteDocument {

    getOutlineSummary (name, type, aspect) {
        return new Promise( resolve => {
            const headers = {"Content-Type":"text/html"}
            const params_obj = {params: {name: name, type: type, aspect: aspect, format: "html"}}
            // https://github.com/axios/axios/issues/3821
            //const url = 'http://localhost:5100/notedocsvc/outline/summary'
            const url = 'http://192.168.1.31:5100/notedocsvc/outline/summary'
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

}

module.exports = NoteDocument