class Response {
    static OK(data = {}) {
        const instance = new Response();
        instance.responseCode = 'OK';
        instance.data = data;
        return instance;
    }

    static ERROR(description = '', data = {}) {
        const instance = new Response();
        instance.responseCode = 'ERROR';
        instance.description = description;
        instance.data = data;
        return instance;
    }
}

module.exports = Response;
