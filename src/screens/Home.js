import React, { useState } from "react";
import { ref as dbRef, push } from "firebase/database";
import { database, storage, storageRef, uploadBytes } from "../firebase";
import { toast } from 'react-toastify';
import "../App.css";
import logo from "../images/logo-removebg-preview.png";


function Home() {
    const [formData, setFormData] = useState({
        nome: "",
        estado_civil: "",
        data_nascimento: "",
        local_nascimento: "",
        idade: "",
        sexo: "",
        geracao: "",
        endereco: "",
        fone_residencial: "",
        celular: "",
        recado: "",
        email: "",
        rg: "",
        cpf: "",
        passaporte: "",
        vencimento_passaporte: "",
        visto: "",
        vencimento_visto: "",
        entrada_japao: "",
        cnh: "",
        cnh_pais: "",
        conjuge_nome: "",
        conjuge_idade: "",
        ocupacao: "",
        pais_nome: "",
        foto: null,
        foto02: null,
        fumante: "",
        hora_extra: "",
        diabetes: '',
        problemasRespiratorios: '',
        podeFazerTurnoAlternado: '',
        doencaCronica: '',
        consegueDistinguirCores: '',
        problemaColuna: '',
        sofreuCirurgia: '',
        tomaMedicamentos: '',
        epilepsia: '',
        tendinite: '',
        usaOculos: '',
        grausOculos: '',
        alergia: '',
        asma: '',
        deficienciaAuditiva: '',
        possuiTatuagemPiercing: '',
        gravidez: '',
        tempoGravidez: '',
        restricaoTrabalharEmPe: '',
        problemaPsicologico: '',
        doencaGrave: '',
        especificacaoDoencaGrave: '',
        pressaoArterial: '',
        habilidade: '',
        tipoSanguineo: '',
        religiao: '',
        precisaSairVisto: '',
        quandoPretendeIrJapao: '',
        quantoTempoPretendeFicar: '',
        observacao: '',
        especificacaoAlergia: '',
        especificacaoMedicamentos: '',
        especificacaoProblemaPsicologico: '',
        linguaJaponesaFala: '',
        linguaJaponesaEntende: '',
        hiraganaLeitura: '',
        hiraganaEscrita: '',
        katakanaLeitura: '',
        katakanaEscrita: '',
        kanjiLeitura: '',
        kanjiEscrita: '',
        peso: '', // Novo campo
        altura: '', // Novo campo
        calcado: '',
        escolaridade: '',
        previsaoSaidaVisto: '', // Novo campo
        quandoPretendeIrJapao: '', // Novo campo
        quantoTempoPretendeFicar: '', // Novo campo
        problemaJusticaJaponesa: '', // Limpar o campo ao enviar
        motivoProblemaJusticaJaponesa: '',
        tipoServicoBrasil: '',
        tipoServicoJapao: '',
        tipoServicoUltimo: '',
        fabricaBrasil: '',
        localBrasil: '',
        periodoBrasil: '',
        periodoJapao: '',
        localJapao: '',
        fabricaJapao: '',
        periodoUltimoServico: '',
        localUltimoServico: '',
        fabricaUltimoServico: '',
        preferenciaRegiaoTrabalho: '',
        nomeFilho: '',
        idadeFilho: '',
        ocupacaoFilho: '',
        utlimoEmpregoBrasil: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({ ...formData, foto: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file); // Converte a imagem para uma string base64
        }
    };
    const handleFileChange2 = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({ ...formData, foto02: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file); // Converte a imagem para uma string base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const databaseRef = dbRef(database, 'cadastros');
            await push(databaseRef, formData);
            toast.success("Enviado com Sucesso!");

            setFormData({
                nome: "",
                estado_civil: "",
                data_nascimento: "",
                local_nascimento: "",
                idade: "",
                sexo: "",
                geracao: "",
                endereco: "",
                fone_residencial: "",
                celular: "",
                recado: "",
                email: "",
                rg: "",
                cpf: "",
                passaporte: "",
                vencimento_passaporte: "",
                visto: "",
                vencimento_visto: "",
                entrada_japao: "",
                cnh: "",
                cnh_pais: "",
                conjuge_nome: "",
                conjuge_idade: "",
                ocupacao: "",
                pais_nome: "",
                foto: null,
                foto02: null,
                fumante: "",
                hora_extra: "",
                especificacaoAlergia: "",
                especificacaoMedicamentos: "",
                especificacaoProblemaPsicologico: "",
                linguaJaponesaFala: "",
                linguaJaponesaEntende: "",
                hiraganaLeitura: "",
                hiraganaEscrita: "",
                katakanaLeitura: "",
                katakanaEscrita: "",
                kanjiLeitura: "",
                kanjiEscrita: "",
                peso: '', // Novo campo
                altura: '', // Novo campo
                calcado: '',
                escolaridade: '', // Novo campo
                previsaoSaidaVisto: '', // Limpar o campo ao enviar
                quandoPretendeIrJapao: '', // Limpar o campo ao enviar
                quantoTempoPretendeFicar: '',
                problemaJusticaJaponesa: '', // Limpar o campo ao enviar
                motivoProblemaJusticaJaponesa: '',
                tipoServicoBrasil: '',
                tipoServicoJapao: '',
                tipoServicoUltimo: '',
                fabricaBrasil: '',
                localBrasil: '',
                periodoBrasil: '',
                periodoJapao: '',
                localJapao: '',
                fabricaJapao: '',
                periodoUltimoServico: '',
                localUltimoServico: '',
                fabricaUltimoServico: '',
                preferenciaRegiaoTrabalho: '',
                nomeFilho: '',
                idadeFilho: '',
                ocupacaoFilho: '',
                utlimoEmpregoBrasil: ''
            });
        } catch (error) {
            toast.error("Erro ao enviar os dados!");
        }
    };

    const [isProblemaJustica, setIsProblemaJustica] = useState(''); // Novo estado para controle da resposta

    const handleProblemaJusticaChange = (e) => {
        const { value } = e.target;
        setIsProblemaJustica(value);
        setFormData((prevData) => ({
            ...prevData,
            problemaJusticaJaponesa: value,
            motivoProblemaJusticaJaponesa: value === 'Sim' ? prevData.motivoProblemaJustica : ''
        }));
    };


    return (
        <div className="container">
            <h1>FICHA DE CADASTRO</h1>
            <header className="header" style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                <img src={logo} alt="Logo" className="logo" style={{ width: '20%', cursor: 'pointer' }} />
            </header>
            <hr />
            <h3 className="text-com-margin-nega" >Dados Pessoais</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">



                    <label htmlFor="nome">Nome Completo</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Sexo</label>
                    <div>
                        <label htmlFor="masculino">
                            <input
                                type="radio"
                                id="masculino"
                                name="sexo"
                                value="Masculino"
                                checked={formData.sexo === 'Masculino'}
                                onChange={handleChange}
                            />
                            Masculino
                        </label>
                    </div>
                    <div>
                        <label htmlFor="feminino">
                            <input
                                type="radio"
                                id="feminino"
                                name="sexo"
                                value="Feminino"
                                checked={formData.sexo === 'Feminino'}
                                onChange={handleChange}
                            />
                            Feminino
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Estado Civil</label>
                    <div>
                        <label htmlFor="solteiro">
                            <input
                                type="radio"
                                id="solteiro"
                                name="estado_civil"
                                value="Solteiro"
                                checked={formData.estado_civil === 'Solteiro'}
                                onChange={handleChange}
                            />
                            Solteiro
                        </label>
                    </div>
                    <div>
                        <label htmlFor="casado">
                            <input
                                type="radio"
                                id="casado"
                                name="estado_civil"
                                value="Casado"
                                checked={formData.estado_civil === 'Casado'}
                                onChange={handleChange}
                            />
                            Casado
                        </label>
                    </div>
                    <div>
                        <label htmlFor="separado">
                            <input
                                type="radio"
                                id="separado"
                                name="estado_civil"
                                value="Separado"
                                checked={formData.estado_civil === 'Separado'}
                                onChange={handleChange}
                            />
                            Separado
                        </label>
                    </div>
                    <div>
                        <label htmlFor="outros">
                            <input
                                type="radio"
                                id="outros"
                                name="estado_civil"
                                value="Outros"
                                checked={formData.estado_civil === 'Outros'}
                                onChange={handleChange}
                            />
                            Outros
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="data_nascimento">Data de Nascimento</label>
                    <input
                        type="date"
                        id="data_nascimento"
                        name="data_nascimento"
                        value={formData.data_nascimento}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="local_nascimento">Local de Nascimento</label>
                    <input
                        type="text"
                        id="local_nascimento"
                        name="local_nascimento"
                        value={formData.local_nascimento}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idade">Idade</label>
                    <input
                        type="number"
                        id="idade"
                        name="idade"
                        value={formData.idade}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Geração</label>
                    <div>
                        <label htmlFor="issei">
                            <input
                                type="radio"
                                id="issei"
                                name="geracao"
                                value="Issei"
                                checked={formData.geracao === 'Issei'}
                                onChange={handleChange}
                            />
                            Issei
                        </label>
                    </div>
                    <div>
                        <label htmlFor="nissei">
                            <input
                                type="radio"
                                id="nissei"
                                name="geracao"
                                value="Nissei"
                                checked={formData.geracao === 'Nissei'}
                                onChange={handleChange}
                            />
                            Nissei
                        </label>
                    </div>
                    <div>
                        <label htmlFor="sansei">
                            <input
                                type="radio"
                                id="sansei"
                                name="geracao"
                                value="Sansei"
                                checked={formData.geracao === 'Sansei'}
                                onChange={handleChange}
                            />
                            Sansei
                        </label>
                    </div>
                    <div>
                        <label htmlFor="yonsei">
                            <input
                                type="radio"
                                id="yonsei"
                                name="geracao"
                                value="Yonsei"
                                checked={formData.geracao === 'Yonsei'}
                                onChange={handleChange}
                            />
                            Yonsei
                        </label>
                    </div>
                    <div>
                        <label htmlFor="nao-descendente">
                            <input
                                type="radio"
                                id="nao-descendente"
                                name="geracao"
                                value="Não descendente"
                                checked={formData.geracao === 'Não descendente'}
                                onChange={handleChange}
                            />
                            Não descendente
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="endereco">Endereço Completo </label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fone_residencial">Fone Residencial</label>
                    <input
                        type="text"
                        id="fone_residencial"
                        name="fone_residencial"
                        value={formData.fone_residencial}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="celular">Celular</label>
                    <input
                        type="text"
                        id="celular"
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="recado">Recado</label>
                    <input
                        type="text"
                        id="recado"
                        name="recado"
                        value={formData.recado}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="rg">RG</label>
                    <input
                        type="text"
                        id="rg"
                        name="rg"
                        value={formData.rg}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <h3>Documentos</h3>
                </div>

                <div className="form-group">
                    <label htmlFor="passaporte">Nº Passaporte</label>
                    <input
                        type="text"
                        id="passaporte"
                        name="passaporte"
                        value={formData.passaporte}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="vencimento_passaporte">Vencimento do Passaporte</label>
                    <input
                        type="date"
                        id="vencimento_passaporte"
                        name="vencimento_passaporte"
                        value={formData.vencimento_passaporte}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Visto</label>
                    <div>
                        <label htmlFor="um-ano">
                            <input
                                type="radio"
                                id="um-ano"
                                name="visto"
                                value="1 ano"
                                checked={formData.visto === '1 ano'}
                                onChange={handleChange}
                            />
                            1 ano
                        </label>
                    </div>
                    <div>
                        <label htmlFor="tres-anos">
                            <input
                                type="radio"
                                id="tres-anos"
                                name="visto"
                                value="3 anos"
                                checked={formData.visto === '3 anos'}
                                onChange={handleChange}
                            />
                            3 anos
                        </label>
                    </div>
                    <div>
                        <label htmlFor="permanente">
                            <input
                                type="radio"
                                id="permanente"
                                name="visto"
                                value="Permanente"
                                checked={formData.visto === 'Permanente'}
                                onChange={handleChange}
                            />
                            Permanente
                        </label>
                    </div>
                    <div>
                        <label htmlFor="re-entry">
                            <input
                                type="radio"
                                id="re-entry"
                                name="visto"
                                value="Re-entry"
                                checked={formData.visto === 'Re-entry'}
                                onChange={handleChange}
                            />
                            Re-entry
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="vencimento_visto">Vencimento do Visto</label>
                    <input
                        type="date"
                        id="vencimento_visto"
                        name="vencimento_visto"
                        value={formData.vencimento_visto}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="entrada_japao">Entrada no Japão</label>
                    <input
                        type="date"
                        id="entrada_japao"
                        name="entrada_japao"
                        value={formData.entrada_japao}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cnh">CNH</label>
                    <input
                        type="text"
                        id="cnh"
                        name="cnh"
                        value={formData.cnh}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>CNH País</label>
                    <div>
                        <label htmlFor="possui">
                            <input
                                type="radio"
                                id="possui"
                                name="cnh_pais"
                                value="Possui"
                                checked={formData.cnh_pais === 'Possui'}
                                onChange={handleChange}
                            />
                            Possui
                        </label>
                    </div>
                    <div>
                        <label htmlFor="nao-possui">
                            <input
                                type="radio"
                                id="nao-possui"
                                name="cnh_pais"
                                value="Não Possui"
                                checked={formData.cnh_pais === 'Não Possui'}
                                onChange={handleChange}
                            />
                            Não Possui
                        </label>
                    </div>
                    <div>
                        <label htmlFor="brasil">
                            <input
                                type="radio"
                                id="brasil"
                                name="cnh_pais"
                                value="Brasil"
                                checked={formData.cnh_pais === 'Brasil'}
                                onChange={handleChange}
                            />
                            Brasil
                        </label>
                    </div>
                    <div>
                        <label htmlFor="japao">
                            <input
                                type="radio"
                                id="japao"
                                name="cnh_pais"
                                value="Japão"
                                checked={formData.cnh_pais === 'Japão'}
                                onChange={handleChange}
                            />
                            Japão
                        </label>
                    </div>
                    <div>
                        <label htmlFor="outro">
                            <input
                                type="radio"
                                id="outro"
                                name="cnh_pais"
                                value="Outro"
                                checked={formData.cnh_pais === 'Outro'}
                                onChange={handleChange}
                            />
                            Outro
                        </label>
                    </div>
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <h3>Familiares</h3>
                </div>
                <div className="form-group">
                    <label htmlFor="conjuge_nome">Nome do Cônjuge</label>
                    <input
                        type="text"
                        id="conjuge_nome"
                        name="conjuge_nome"
                        value={formData.conjuge_nome}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="nomeFilho">Nome do Filho(a):</label>
                    <input
                        type="text"
                        id="nomeFilho"
                        name="nomeFilho"
                        value={formData.nomeFilho}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="idadeFilho">Idade do Filho(a):</label>
                    <input
                        type="text"
                        id="idadeFilho"
                        name="idadeFilho"
                        value={formData.idadeFilho}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ocupacaoFilho">Ocupação do Filho(a):</label>
                    <input
                        type="text"
                        id="ocupacaoFilho"
                        name="ocupacaoFilho"
                        value={formData.ocupacaoFilho}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="conjuge_idade">Idade do Cônjuge</label>
                    <input
                        type="number"
                        id="conjuge_idade"
                        name="conjuge_idade"
                        value={formData.conjuge_idade}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ocupacao">Ocupação</label>
                    <input
                        type="text"
                        id="ocupacao"
                        name="ocupacao"
                        value={formData.ocupacao}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pais_nome">Nome do País</label>
                    <input
                        type="text"
                        id="pais_nome"
                        name="pais_nome"
                        value={formData.pais_nome}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <h3>Saúde</h3>
                </div>
                <div className="form-group">
                    <label>É fumante?</label>
                    <div>
                        <label htmlFor="fumante_sim">
                            <input
                                type="radio"
                                id="fumante_sim"
                                name="fumante"
                                value="Sim"
                                checked={formData.fumante === 'Sim'}
                                onChange={handleChange}
                            />
                            Sim
                        </label>
                    </div>
                    <div>
                        <label htmlFor="fumante_nao">
                            <input
                                type="radio"
                                id="fumante_nao"
                                name="fumante"
                                value="Não"
                                checked={formData.fumante === 'Não'}
                                onChange={handleChange}
                            />
                            Não
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <label>Pode fazer hora extra?</label>
                    <div>
                        <label htmlFor="hora_extra_sim">
                            <input
                                type="radio"
                                id="hora_extra_sim"
                                name="hora_extra"
                                value="Sim"
                                checked={formData.hora_extra === 'Sim'}
                                onChange={handleChange}
                            />
                            Sim
                        </label>
                    </div>
                    <div>
                        <label htmlFor="hora_extra_nao">
                            <input
                                type="radio"
                                id="hora_extra_nao"
                                name="hora_extra"
                                value="Não"
                                checked={formData.hora_extra === 'Não'}
                                onChange={handleChange}
                            />
                            Não
                        </label>
                    </div>
                </div>

                <label>
                    Diabetes?
                    <select
                        name="diabetes"
                        value={formData.diabetes}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Problemas respiratórios?
                    <select
                        name="problemasRespiratorios"
                        value={formData.problemasRespiratorios}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Pode fazer turno alternado?
                    <select
                        name="podeFazerTurnoAlternado"
                        value={formData.podeFazerTurnoAlternado}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Doença crónica?
                    <select
                        name="doencaCronica"
                        value={formData.doencaCronica}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Consegue distinguir bem as cores?
                    <select
                        name="consegueDistinguirCores"
                        value={formData.consegueDistinguirCores}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Problema de coluna?
                    <select
                        name="problemaColuna"
                        value={formData.problemaColuna}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Sofreu cirurgia?
                    <select
                        name="sofreuCirurgia"
                        value={formData.sofreuCirurgia}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Toma medicamentos?
                    <select
                        name="tomaMedicamentos"
                        value={formData.tomaMedicamentos}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                {formData.tomaMedicamentos === 'sim' && (
                    <label>
                        Especifique? [Medicamentos]
                        <input
                            type="text"
                            name="especificacaoMedicamentos"
                            value={formData.especificacaoMedicamentos}
                            onChange={handleChange}
                        />
                    </label>
                )}

                <label>
                    Gravidez?
                    <select
                        name="gravidez"
                        value={formData.gravidez}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Tendinite?
                    <select
                        name="tendinite"
                        value={formData.tendinite}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Usa óculos?
                    <select
                        name="usaOculos"
                        value={formData.usaOculos}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>


                {formData.usaOculos === 'sim' && (
                    <label>
                        Quantos graus?
                        <input
                            type="text"
                            name="grausOculos"
                            value={formData.grausOculos}
                            onChange={handleChange}
                        />
                    </label>
                )}

                <label>
                    Alergia?
                    <select
                        name="alergia"
                        value={formData.alergia}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                {formData.alergia === 'sim' && (
                    <label>
                        Especifique? [Alergia]
                        <input
                            type="text"
                            name="especificacaoAlergia"
                            value={formData.especificacaoAlergia}
                            onChange={handleChange}
                        />
                    </label>
                )}
                <label>
                    Asma?
                    <select
                        name="asma"
                        value={formData.asma}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Deficiência auditiva?
                    <select
                        name="deficienciaAuditiva"
                        value={formData.deficienciaAuditiva}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Possui tatuagem/piercing?
                    <select
                        name="possuiTatuagemPiercing"
                        value={formData.possuiTatuagemPiercing}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>
                {formData.gravidez === 'sim' && (
                    <label>
                        Quanto tempo? [Gravidez]
                        <input
                            type="text"
                            name="tempoGravidez"
                            value={formData.tempoGravidez}
                            onChange={handleChange}
                        />
                    </label>
                )}

                <label>
                    Tem alguma restrição para trabalhar em pé?
                    <select
                        name="restricaoTrabalharEmPe"
                        value={formData.restricaoTrabalharEmPe}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                <label>
                    Algum problema psicológico?
                    <select
                        name="problemaPsicologico"
                        value={formData.problemaPsicologico}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                {formData.problemaPsicologico === 'sim' && (
                    <label>
                        Especifique? [Problema Psicológico]
                        <input
                            type="text"
                            name="especificacaoProblemaPsicologico"
                            value={formData.especificacaoProblemaPsicologico}
                            onChange={handleChange}
                        />
                    </label>
                )}

                <label>
                    Doença grave?
                    <select
                        name="doencaGrave"
                        value={formData.doencaGrave}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Selecione
                        </option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
                </label>

                {formData.doencaGrave === 'sim' && (
                    <label>
                        Especifique: [Doença Grave]
                        <input
                            type="text"
                            name="especificacaoDoencaGrave"
                            value={formData.especificacaoDoencaGrave}
                            onChange={handleChange}
                        />
                    </label>
                )}

                <label>
                    Pressão arterial:
                    <input
                        type="text"
                        name="pressaoArterial"
                        value={formData.pressaoArterial}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Tipo sanguíneo:
                    <input
                        type="text"
                        name="tipoSanguineo"
                        value={formData.tipoSanguineo}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Qual sua religião?
                    <input
                        type="text"
                        name="religiao"
                        value={formData.religiao}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Precisa de sair o visto?
                    <input
                        type="text"
                        name="precisaSairVisto"
                        value={formData.precisaSairVisto}
                        onChange={handleChange}
                    />
                </label>

                {/* <label>
                    Quando pretende ir ao Japão?
                    <input
                        type="text"
                        name="quandoPretendeIrJapao"
                        value={formData.quandoPretendeIrJapao}
                        onChange={handleChange}
                    />
                </label> */}

                {/* <label>
                    Quanto tempo pretende ficar?
                    <input
                        type="text"
                        name="quantoTempoPretendeFicar"
                        value={formData.quantoTempoPretendeFicar}
                        onChange={handleChange}
                    />
                </label> */}

                <div>
                    <label htmlFor="observacao">Observação:</label>
                    <textarea
                        id="observacao"
                        name="observacao"
                        value={formData.observacao}
                        onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
                        rows="4"
                        cols="50"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="foto">Foto (Rosto)</label>
                    <input
                        type="file"
                        id="foto"
                        name="foto"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>































                <div className="form-group">
                    <label htmlFor="peso">Peso (kg)</label>
                    <input
                        id="peso"
                        type="text"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="altura">Altura (cm)</label>
                    <input
                        id="altura"
                        type="text"
                        name="altura"
                        value={formData.altura}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="calcado">Calçado (número)</label>
                    <input
                        id="calcado"
                        type="text"
                        name="calcado"
                        value={formData.calcado}
                        onChange={handleChange}
                    />
                </div>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <h3>Idioma Japonês</h3>
                </div>
                <div className="form-group">
                    <label htmlFor="escolaridade">Escolaridade</label>
                    <select
                        id="escolaridade"
                        name="escolaridade"
                        value={formData.escolaridade}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Não Concluído">Não Concluído</option>
                        <option value="Médio">Médio</option>
                        <option value="Superior">Superior</option>
                        <option value="Fundamental">Fundamental</option>
                    </select>

                </div>



                <div className="form-group">
                    <label htmlFor="fluencia">Fluência em Japonês [Fala]</label>
                    <select
                        id="fluencia"
                        name="linguaJaponesaFala"
                        value={formData.linguaJaponesaFala}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fluencia">Fluência em Japonês [Entende]</label>
                    <select
                        id="fluencia"
                        name="linguaJaponesaEntende"
                        value={formData.linguaJaponesaEntende}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fluencia">HIRAGANA [Leitura]</label>
                    <select
                        id="fluencia"
                        name="hiraganaLeitura"
                        value={formData.hiraganaLeitura}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fluencia">HIRAGANA [Escrita]</label>
                    <select
                        id="fluencia"
                        name="hiraganaEscrita"
                        value={formData.hiraganaEscrita}
                        onChange={handleChange}
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fluencia">katakana [Leitura]</label>
                    <select
                        id="fluencia"
                        name="hiraganaEscrita"
                        value={formData.katakanaLeitura}
                        onChange={handleChange}

                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fluencia">katakana [Escrita]</label>
                    <select
                        id="fluencia"
                        name="katakanaEscrita"
                        value={formData.katakanaEscrita}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fluencia">KANJI [Leitura]</label>
                    <select
                        id="fluencia"
                        name="kanjiLeitura"
                        value={formData.kanjiLeitura}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fluencia">KANJI [Escrita]</label>
                    <select
                        id="fluencia"
                        name="kanjiEscrita"
                        value={formData.kanjiEscrita}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="Nada">Nada</option>
                        <option value="Pouco">Pouco</option>
                        <option value="Fluente">Fluente</option>
                    </select>
                </div>

                <br />
                <h3 style={{ marginTop: '1100px', textAlign: 'center', marginLeft: '-400px', width: '100%' }}>
                    Experiências Profissionais
                </h3>

                <div className="form-group">
                    <label htmlFor="fabricaBrasil">Empresa (Brasil):</label>
                    <input
                        type="text"
                        id="fabricaBrasil"
                        name="fabricaBrasil"
                        value={formData.fabricaBrasil}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipoServicoBrasil">Tipo de serviço (Brasil):</label>
                    <input
                        type="text"
                        id="tipoServicoBrasil"
                        name="tipoServicoBrasil"
                        value={formData.tipoServicoBrasil}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="localBrasil">Local [Brasil]:</label>
                    <input
                        type="text"
                        id="localBrasil"
                        name="localBrasil"
                        value={formData.localBrasil}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="periodoBrasil">Período (Mês e Ano) (Brasil):</label>
                    <input
                        type="text"
                        id="periodoBrasil"
                        name="periodoBrasil"
                        value={formData.periodoBrasil}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fabricaJapao">Fábrica (Japão):</label>
                    <input
                        type="text"
                        id="fabricaJapao"
                        name="fabricaJapao"
                        value={formData.fabricaJapao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipoServicoJapao">Tipo de serviço (Japão):</label>
                    <input
                        type="text"
                        id="tipoServicoJapao"
                        name="tipoServicoJapao"
                        value={formData.tipoServicoJapao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="localJapao">Local [Japão]:</label>
                    <input
                        type="text"
                        id="localJapao"
                        name="localJapao"
                        value={formData.localJapao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="periodoJapao">Período (Mês e Ano) [Japão]:</label>
                    <input
                        type="text"
                        id="periodoJapao"
                        name="periodoJapao"
                        value={formData.periodoJapao}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipoServicoUltimo">Último Emprego no Brasil:</label>
                    <input
                        type="text"
                        id="tipoServicoUltimo"
                        name="tipoServicoUltimo"
                        value={formData.utlimoEmpregoBrasil}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tipoServicoUltimo">Tipo de serviço [Último Serviço]:</label>
                    <input
                        type="text"
                        id="tipoServicoUltimo"
                        name="tipoServicoUltimo"
                        value={formData.tipoServicoUltimo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="fabricaUltimoServico">Fábrica [Último Serviço]:</label>
                    <input
                        type="text"
                        id="fabricaUltimoServico"
                        name="fabricaUltimoServico"
                        value={formData.fabricaUltimoServico}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="localUltimoServico">Local [Último Serviço]:</label>
                    <input
                        type="text"
                        id="localUltimoServico"
                        name="localUltimoServico"
                        value={formData.localUltimoServico}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="periodoUltimoServico">Período (Mês e Ano) [Último Serviço]:</label>
                    <input
                        type="text"
                        id="periodoUltimoServico"
                        name="periodoUltimoServico"
                        value={formData.periodoUltimoServico}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="preferenciaRegiaoTrabalho">Tem preferência por região de trabalho?</label>
                    <input
                        type="text"
                        id="preferenciaRegiaoTrabalho"
                        name="preferenciaRegiaoTrabalho"
                        value={formData.preferenciaRegiaoTrabalho}
                        onChange={handleChange}
                    />
                </div>


                <div className="form-group">
                    <label htmlFor="previsaoSaidaVisto">previsão de sair o visto?</label>
                    <input
                        type="date"
                        id="previsaoSaidaVisto"
                        name="previsaoSaidaVisto"
                        value={formData.previsaoSaidaVisto}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quandoPretendeIrJapao">quando pretende ir ao japão?</label>
                    <input
                        type="date"
                        id="quandoPretendeIrJapao"
                        name="quandoPretendeIrJapao"
                        value={formData.quandoPretendeIrJapao}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantoTempoPretendeFicar">quanto tempo pretende ficar?</label>
                    <input
                        type="text"
                        id="quantoTempoPretendeFicar"
                        name="quantoTempoPretendeFicar"
                        value={formData.quantoTempoPretendeFicar}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Já teve algum problema com a justiça japonesa?</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="problemaJusticaJaponesa"
                                value="Sim"
                                checked={isProblemaJustica === 'Sim'}
                                onChange={handleProblemaJusticaChange}
                            />
                            Sim
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="problemaJusticaJaponesa"
                                value="Não"
                                checked={isProblemaJustica === 'Não'}
                                onChange={handleProblemaJusticaChange}
                            />
                            Não
                        </label>
                    </div>
                </div>
                {isProblemaJustica === 'Sim' && (
                    <div className="form-group">
                        <label htmlFor="motivoProblemaJusticaJaponesa">Qual o motivo? [Problema com a justiça Japonesa]</label>
                        <textarea
                            id="motivoProblemaJusticaJaponesa"
                            name="motivoProblemaJusticaJaponesa"
                            value={formData.motivoProblemaJusticaJaponesa}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="foto">Mais imagens (Foto do corpo e Tatuagens, se tiver):</label>
                    <input
                        type="file"
                        id="foto02"
                        name="foto02"
                        accept="image/*"
                        onChange={handleFileChange2}
                    />
                </div>





                <button type="submit">Enviar</button>
            </form>
        </div >
    );
}

export default Home;
