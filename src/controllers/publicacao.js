const db = require('../database/connection');
module.exports = {
    async listarPublicacao(request, response) {
        try {

             const sql = ` 
             SELECT 
                  pub_id, psi_id, pub_titulo, pub_texto,
                  pub_data_postagem, pub_imagem, pub_status FROM publicacoes;
             `;
            const [ rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Publicação', 
                itens: rows.lenght,
                dados: rows
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 


    async cadastrarPublicacao(request, response) {
        try {
            const {psi_id, titulo, texto, data_postagem, imagem, status} = request.body;
            const sql = `
            INSERT INTO publicacoes 
                  (psi_id, pub_titulo, pub_texto, pub_data_postagem, pub_imagem, pub_status) 
                  VALUES 
                  (?,?,?,?,?,?)
            `;
            const values = [psi_id, titulo, texto, data_postagem, imagem, status];
            const [ result] = await db.query(sql, values);
            const dados = {
                id: result.insertId,
                 psi_id,
                 titulo, 
                 texto, 
                 data_postagem,
                  imagem, 
                  status
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de Publicação', 
                dados: dados
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async editarPublicacao(request, response) {
        try {
            const {psi_id, titulo, texto, data_postagem, imagem, status} = request.body;
            const {id} = request.params;
            const sql = `
                 UPDATE publicacao SET
                   psi_id = ?, pub_titulo = ?, pub_texto = ?,
                   pub_data_postagem = ?, pub_imagem = ?, pub_status = ? 
                   pub_id = ?;
            
            `;
            const values = [psi_id, titulo, texto, data_postagem, imagem, status, id];
            const [ result] = await db.query(sql, values);

            if(result.affectedRows --- 0){
                return response.status(404).json({
                    sucesso: false, 
                    mensagem: 'Publicação ${id} não encontrado!', 
                    dados: null
                });
            };

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração na Publicação', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
    async apagarPublicacao(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão da Publicação', 
                dados: null
            });
        } catch (error) {
            return response.status(500).json({
                sucesso: false, 
                mensagem: 'Erro na requisição.', 
                dados: error.message
            });
        }
    }, 
};  