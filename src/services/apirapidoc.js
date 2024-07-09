const { create } = require("apisauce");
const { v4: uuidv4 } = require('uuid');

// Configurar a API
const apirapidoc = create({
    baseURL: 'https://sandbox.rapidoc.tech/'
});

// Adicionar cabeçalhos ao pedido
apirapidoc.addAsyncRequestTransform(async (request) => {
    request.headers['Content-Type'] = `application/vnd.rapidoc.tema-v2+json`;
    request.headers['Authorization'] = `Bearer eyJhbGciOiJSUzUxMiJ9.eyJjbGllbnQiOiJEb2N0b3JzNFUgVGVzdGUifQ.FaMFSaq0X3YF--EyBDVYQlWVmfGy6LS2nmGxKR9hkBbn1jW6jdfjtvC27rFvu4JMYPcNy8RtXpa_ze-GnpG1OwDuBZ33NgSQiD7_kUmZp_iQG3zQO3gWS-vLv5fHLgIvZv4ZhECS0TPqS2bAsdQ8B16EBcBDSd9CGcPlmw9A94uheJCS3UDq-YsDFM3j-BCIt5jdsVQalg3CrwIk5iP-CynirC5KQB-RYtel22BoPo3vIQVDLPs15fADfRlPFfku2o5hBXgbira9oshouYFXttOELDa-ixrsyA5aQrjj7HY-x_fbeyxD1zcWgMBZf9bFHnMLFAq_DIFtGb9UPdgkIkrHv3HYCGwh1QAOBi2_oMIcN7Y0QKN9-_0KW8aN__ORSM0e_r5C34-RTU_bR5YFMVlr72QS_RhJfD7BaKYkJrT_6Vyc30gQ7nYvsoZR8qrw3AW312O9fZqlFSNYj84Sq6NPl0mrxOeZv3bksQfHoef0Xq2H-vFrtfrcH-hnyEeaUrXBQ8335I8Z8mGwc0dA3J_IwilRGoX7a5D7j2uaJ7yj-6VOfnBabt1L5vKJCZyM9c3WChUfsSWf8PmqlmeBBr0aA3G5z6V83cph7oRdwvjmsbvurTQF3AfD0oQ61FF3D7N-SLycXN-9YOvYBHj9sueHo2CE_7AVdLRo_YTouIU`;
    request.headers['clientId'] = "2e19f00b-9a07-4a15-a098-528a1e4eccce";
});

module.exports = apirapidoc;
