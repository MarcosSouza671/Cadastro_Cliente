import usuarioBD from "../../model/repositories/usuarioBD";
import seguranca from "../../model/components/segurança";

export default function usuario(app){
    app.get("/login", (req, res) => {
        if(req.query.fail){
            res.render('usuario/Login', {mensagemLogin: 'Usuário e/ou senha incorretos!'})
        }else{
            res.render('usuario/Login', {mensagemLogin: null})
        }
    })

    app.get('/cadastro', (req, res) => {
        if (req.query.fail){
            res.render('usuario/Cadastro', {mensagem: 'Cadastro'});
        } else {
            res.render('usuario/Cadastro', {mensagem: null});
        }
    });

    app.get('/lista/usuario', async (req, res, next) => {
        try {
            const docs = await usuarioBD.selectUsuario();
            res.render('usuario/lista', { mensagem: 'lista de Usuários', docs });
        } catch (err) {
            next(err);
        }
    });

    app.get('/delete/usuario/:id', async (req, res, next) => {
        try{
            var id = req.params.id;
            await usuarioBD.deleteUsuario(id);
            const docs = await usuarioBD.selectUsuario();
            res.render('usuario/Lista', {mensagem:'', usuario});
            //JMeter
        } catch (err) {
            next(err);
        }
    });

    app.get('/edit/usuario/:id', async (req, res, next) => {
        try{
            var id = req.params.id;
            const usuario = await usuarioBD.getUsuarioId(id);
            res.render('usuario/EditUsuario', {mensagem: '', usuario});
        }catch (err) {
            next(err);
        }
    })

    app.post('/cadastro/usuario/edit/salvar', (req,res)=>{
        var usuario = {
            nome: req.body.nome,
            senha: req.body.senha,
            id: req.body.id
        }

        try{
            usuarioBD.updateUsuario(usuario);
            res.render('usuario/Sucesso', { mensagem: 'alterado'});
        }catch (error) {
            res.render('usuario/EditUsuario', { title: 'Edição Cadastro', mensagem: 'Erro no cadastrado' });
        }
    });

    app.post('/cadastro/usuario/salvar', (req, res) => {
        try{
            var usuario = {
                nome: req.body.nome,
                senha: seguranca.ocultarsenha(req.body.senha)
            }
            usuarioBD.insertUsuario(usuario);
            res.render('usuario/Sucesso', { mensagem: 'cadastrado' });
        } catch (error) {
            console.log(error);
            res.render('usuario/Cadastro', { title: 'Cadastrado', mensagem: 'Erro no Cadastro'});
        }
    })

    app.post("/login/executar", (req,res) => {
        if(req.body.nome === "victor" && req.body.senha === "123456"){
            res.render('/lista/usuario', {mensagem: 'cadsatrado'});
        }else{
            res.render('login/?fail=true');
        }
    })
}