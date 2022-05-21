modile.exports = function (app) {
    app.get("/login", function(req, res){
        if (req.query.fail)
            res.render('usuario/Login',{ mensegemLogin:'Usuario e/ou senha incorretos!'});
        else
            res.render('usuario/Login',{ mensagemLogin: null });
    })
    app.post('/login/executar', (req, res) => {
        if( req.body.nome === "Marcos" && req.body.senha === "123456")
            res.render('/lista/usuario', { mensagem: 'cadastrado'});
        else
            res.render('/login/?fail=true');
    });
    app.get("/cadastro", function(req, res){
        if (req.query.fail)
            res.render('usuario/Cadastro', { mansagem: 'Cadastro' });
        else
            res.render('usuario/Cadastro', { mensagem: null });
    });
    app.post('/cadastro/usuario/salvar', (req, res) => {
        try {
            var usuario = {nome: req.body.nome, senha: seguranca.ocultarsenha(req.body.senha)}
            usuarioBanco.insertUsuario(usuario);
            res.render('usuario/Sucesso', {mensagem: 'cadastrado' });
        } catch (error) {
            console.log(error);
        }
    })
    app.get('/lista/usuario', async (req, res, next) => {
        try {
            const docs = await usuarioBanco.selectUsuario();
            res.render('usuario/Lista', { mensagem: 'Lista de Usuários', docs});
        } catch (err) {
            next(err);
        }
    });
    app.get('/delete/usuario/:id', async (req, res, next) => {
        try {
            var id = req.params.id;
            await usuarioBanco.deleteUsuario(id);
            const docs = await usuarioBanco.selectUsuario();
            res.render('usuario/Lista', { mensagem: 'Usuario excluído com sucesso' , docs });
        } catch (err) {
            next(err);
        }
    });
    app.get('/edit/usuario/:id', async (req, res, next) => {
        try {
            var id = req.params.id;
            const docs = await usuarioBanco.selectUsuario();
            res.render('usuario/EditUsuario', { mensagem: 'Usuario excluído com sucesso' , docs });
        } catch (err) {
            next(err);
        }
    })
}