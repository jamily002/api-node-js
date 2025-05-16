const db = require('../database/connection');
module.exports = {
    async listarAgendamento(request, response) {
        try {

           const sql = `
           SELECT 
           agd_id, psi_id, usu_id, agd_data_consulta, agd_inicio_consulta, 
           agd_fim_consulta, agd_anotacoes_consulta 
           FROM agendamentos;
           `;
           const [ rows] = await db.query(sql);

            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Lista de Agendamento', 
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

    async cadastrarAgendamento(request, response) {
        try {

            const {psi_id ,usu_id, data_consulta,inicio_consulta,fim_consulta, 
                   anotacoes_consulta}  = request.body;
             const sql = `
             INSERT INTO agendamentos  
                 (psi_id, usu_id, agd_data_consulta, agd_inicio_consulta, agd_fim_consulta, agd_anotacoes_consulta)
             VALUES 
              (?, ?, ?, ?, ?, ?)
             `;

             const values = [psi_id ,usu_id, data_consulta,inicio_consulta,fim_consulta, anotacoes_consulta];

             const [result] = await db.query(sql, values);

             const dados = {
                agd_id: result.insertId,
                psi_id ,
                usu_id, 
                data_consulta,
                inicio_consulta,
                fim_consulta, 
                anotacoes_consulta
             };
             
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Cadastro de Agendamento', 
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


    async editarAgendamento(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Alteração no Agendamento', 
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


    async apagarAgendamento(request, response) {
        try {
            return response.status(200).json({
                sucesso: true, 
                mensagem: 'Exclusão do Agendamento', 
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