const { create } = require("apisauce");
const { v4: uuidv4 } = require('uuid');

// Configurar a API
const api = create({
    baseURL: 'https://api.mercadopago.com/v1/'
});

// Adicionar cabeçalhos ao pedido
api.addAsyncRequestTransform(async (request) => {
    request.headers['X-Idempotency-Key'] = uuidv4();
    request.headers['Authorization'] = `Bearer TEST-7805214296131266-062301-83c02b9e737d72224e0e84cbade18289-241139402`;
});

module.exports = api;
