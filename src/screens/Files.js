import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '../Files.css';
import logo from "../images/logo-removebg-preview.png";

export const Files = () => {
    const [names, setNames] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        const dbRef = ref(database, 'cadastros');

        const fetchData = () => {
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const peopleList = Object.entries(data).map(([id, item]) => ({ id, ...item }));
                    setNames(peopleList);
                } else {
                    setNames([]);
                }
            });
        };

        fetchData();
    }, []);

    const handleNameClick = (person) => {
        setSelectedPerson(person);
    };

    const handleClose = () => {
        setSelectedPerson(null);
    };

    const handleDownloadPDF = async () => {
        if (!selectedPerson) return;

        const pdf = new jsPDF();
        const element = document.getElementById('person-details');
        const canvas = await html2canvas(element);

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        // Primeira página
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;

        // Adicionar páginas subsequentes se o conteúdo exceder uma página
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`${selectedPerson.nome}_details.pdf`);
    };

    return (
        <div className="files-container zoom-80">
            <h1>Lista:</h1>
            <ul className="names-list">
                {names.length > 0 ? (
                    names.map((person) => (
                        <li
                            key={person.id}
                            onClick={() => handleNameClick(person)}
                            className="name-item"
                        >
                            {person.nome}
                        </li>
                    ))
                ) : (
                    <li className="no-data">Nenhum nome encontrado.</li>
                )}
            </ul>

            {selectedPerson && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleClose}>&times;</span>
                        <div id="person-details" className="person-details" style={{ fontSize: '9px' }}>
                            <h3 style={{ width: '100%', textAlign: 'center', background: '#44444422' }}>Dados Pessoais</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ margin: '0 10px' }}>
                                    <div style={{ width: '220px' }}>
                                        {selectedPerson.foto && (
                                            <div className="photo-container " style={{ marginTop: '0px' }}>
                                                <img src={selectedPerson.foto} alt="Foto" />
                                            </div>
                                        )}
                                    </div>





                                </div>

                                <div style={{ margin: '0 10px' }}>

                                    <p><strong>Nome:</strong> {selectedPerson.nome}</p>
                                    <p><strong>Estado Civil:</strong> {selectedPerson.estado_civil}</p>
                                    <p><strong>Data de Nascimento:</strong> {selectedPerson.data_nascimento}</p>
                                    <p><strong>Local de Nascimento:</strong> {selectedPerson.local_nascimento}</p>
                                    <p><strong>Idade:</strong> {selectedPerson.idade}</p>
                                    <p><strong>Sexo:</strong> {selectedPerson.sexo}</p>
                                    <p><strong>Geração:</strong> {selectedPerson.geracao}</p>



                                </div>
                                <div style={{ margin: '0 10px' }}>
                                    <p><strong>RG:</strong> {selectedPerson.rg}</p>
                                    <p><strong>CPF:</strong> {selectedPerson.cpf}</p>
                                    <p><strong>Endereço:</strong> {selectedPerson.endereco}</p>
                                    <p><strong>Telefone Residencial:</strong> {selectedPerson.fone_residencial}</p>
                                    <p><strong>Celular:</strong> {selectedPerson.celular}</p>
                                    <p><strong>Recado:</strong> {selectedPerson.recado}</p>
                                    <p><strong>Email:</strong> {selectedPerson.email}</p>



                                </div>
                            </div>
                            {/* <hr /> */}
                            <h3 style={{ width: '100%', textAlign: 'center', background: '#44444422' }}>Documentos</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>
                                    <p><strong>Passaporte:</strong> {selectedPerson.passaporte}</p>
                                    <p><strong>Vencimento Passaporte:</strong> {selectedPerson.vencimento_passaporte}</p>
                                    <p><strong>Visto:</strong> {selectedPerson.visto}</p>
                                    <p><strong>Vencimento Visto:</strong> {selectedPerson.vencimento_visto}</p>
                                    <p><strong>Entrada Japão:</strong> {selectedPerson.entrada_japao}</p>
                                </div>
                                <div>
                                    <p><strong>CNH:</strong> {selectedPerson.cnh}</p>
                                    <p><strong>CNH País:</strong> {selectedPerson.cnh_pais}</p>
                                    <p><strong>CNH Qual:</strong> {selectedPerson.cnh_qual}</p>
                                    <p><strong>Nome do País:</strong> {selectedPerson.pais_nome}</p>
                                    <p><strong>Pode fazer hora extra:</strong> {selectedPerson.hora_extra}</p>
                                </div>


                            </div>
                            <h3 style={{ width: '100%', textAlign: 'center', background: '#44444422' }}>Familiares</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>
                                    <p><strong>Nome do Cônjuge:</strong> {selectedPerson.conjuge_nome}</p>
                                    <p><strong>Idade do Cônjuge:</strong> {selectedPerson.conjuge_idade}</p>
                                    <p><strong>Ocupação:</strong> {selectedPerson.ocupacao}</p>
                                </div>


                            </div>
                            <h3 style={{ width: '100%', textAlign: 'center', background: '#44444422' }}>Saúde</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>

                                    <p><strong>Fumante:</strong> {selectedPerson.fumante}</p>
                                    <p><strong>Diabetes:</strong> {selectedPerson.diabetes}</p>
                                    <p><strong>Problemas Respiratórios:</strong> {selectedPerson.problemasRespiratorios}</p>
                                    <p><strong>Pode fazer turno alternado:</strong> {selectedPerson.podeFazerTurnoAlternado}</p>
                                    <p><strong>Doença Crônica:</strong> {selectedPerson.doencaCronica}</p>
                                    <p><strong>Consegue distinguir cores:</strong> {selectedPerson.consegueDistinguirCores}</p>
                                    <p><strong>Problema de Coluna:</strong> {selectedPerson.problemaColuna}</p>
                                    <p><strong>Sofreu Cirurgia:</strong> {selectedPerson.sofreuCirurgia}</p>
                                    <p><strong>Toma Medicamentos:</strong> {selectedPerson.tomaMedicamentos}</p>
                                </div>
                                <div>
                                    <p><strong>Tipo de Medicamento:</strong> {selectedPerson.especificacaoMedicamentos}</p>
                                    <p><strong>Epilepsia:</strong> {selectedPerson.epilepsia}</p>
                                    <p><strong>Tendinite:</strong> {selectedPerson.tendinite}</p>
                                    <p><strong>Usa Óculos:</strong> {selectedPerson.usaOculos}</p>
                                    <p><strong>Graus Óculos:</strong> {selectedPerson.grausOculos}</p>
                                    <p><strong>Alergia:</strong> {selectedPerson.alergia}</p>
                                    <p><strong>Tipo de Alergia:</strong> {selectedPerson.especificacaoAlergia}</p>
                                    <p><strong>Asma:</strong> {selectedPerson.asma}</p>
                                    <p><strong>Deficiência Auditiva:</strong> {selectedPerson.deficienciaAuditiva}</p>
                                </div>

                            </div>
                            <h3 style={{ width: '100%', textAlign: 'center', background: '#44444422' }}>Piercing e tatuagens</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                {/* <div style={{ margin: '-20px 0' }}>
                                    <p><strong>Possui Tatuagem/Piercing:</strong> {selectedPerson.possuiTatuagemPiercing}</p>
                                </div> */}
                                <div>
                                    <p><strong>Possui Tatuagem/Piercing:</strong> {selectedPerson.possuiTatuagemPiercing}</p>
                                </div>

                            </div>
                            <h3 style={{ width: '100%', textAlign: 'center', background: '#44444422' }}>Informações Adicionais</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>
                                    <p><strong>Gravidez:</strong> {selectedPerson.gravidez}</p>
                                    <p><strong>Tempo de Gravidez:</strong> {selectedPerson.tempoGravidez}</p>
                                    <p><strong>Restrição para Trabalhar em Pé:</strong> {selectedPerson.restricaoTrabalharEmPe}</p>
                                    <p><strong>Problema Psicológico:</strong> {selectedPerson.problemaPsicologico}</p>
                                    <p><strong>Tipo Problema Psicológico:</strong> {selectedPerson.especificacaoProblemaPsicologico}</p>
                                    <p><strong>Doença Grave:</strong> {selectedPerson.doencaGrave}</p>
                                    <p><strong>Especificação da Doença Grave:</strong> {selectedPerson.especificacaoDoencaGrave}</p>
                                    <p><strong>Pressão Arterial:</strong> {selectedPerson.pressaoArterial}</p>
                                    <p><strong>Habilidade:</strong> {selectedPerson.habilidade}</p>
                                    <p><strong>Tipo Sanguíneo:</strong> {selectedPerson.tipoSanguineo}</p>
                                    <p><strong>Religião:</strong> {selectedPerson.religiao}</p>

                                    <p><strong>Precisa de Sair o Visto:</strong> {selectedPerson.precisaSairVisto}</p>

                                </div>
                                <div>
                                    <p><strong>Quando Pretende Ir ao Japão:</strong> {selectedPerson.quandoPretendeIrJapao}</p>
                                    <p><strong>Quanto Tempo Pretende Ficar:</strong> {selectedPerson.quantoTempoPretendeFicar}</p>
                                    <p><strong>Observação:</strong> {selectedPerson.observacao}</p>
                                    <p><strong>língua [Japonesa]:</strong> {selectedPerson.linguaJaponesaFala}</p>
                                    <p><strong>língua [Entendimento]:</strong> {selectedPerson.linguaJaponesaEntende}</p>
                                    <p><strong>língua [Fala]:</strong> {selectedPerson.linguaJaponesaFala}</p>
                                    <p><strong>Hiragana [Leitura]:</strong> {selectedPerson.hiraganaLeitura}</p>
                                    <p><strong>Hiragana [Escrita]:</strong> {selectedPerson.hiraganaEscrita}</p>
                                    <p><strong>Katakana [Leitura]:</strong> {selectedPerson.katakanaLeitura}</p>
                                    <p><strong>Katakana [Escrita]:</strong> {selectedPerson.katakanaEscrita}</p>
                                    <p><strong>Kanji [Leitura]:</strong> {selectedPerson.kanjiLeitura}</p>
                                    <p><strong>Kanji [Escrita]:</strong> {selectedPerson.kanjiEscrita}</p>


                                </div>
                                <div>
                                    <p><strong>Peso:</strong> {selectedPerson.peso}</p>
                                    <p><strong>Altura:</strong> {selectedPerson.altura}</p>
                                    <p><strong>Calçado:</strong> {selectedPerson.calcado}</p>
                                    <p><strong>Calçado:</strong> {selectedPerson.calcado}</p>
                                    <p><strong>Previsão Saida Visto:</strong> {selectedPerson.previsaoSaidaVisto}</p>
                                    <p><strong>Quando Pretende Ir Japao:</strong> {selectedPerson.quandoPretendeIrJapao}</p>
                                    <p><strong>Quanto Tempo Pretende Ficar:</strong> {selectedPerson.quantoTempoPretendeFicar}</p>
                                    <p><strong>Problema Justiça Japonesa:</strong> {selectedPerson.problemaJusticaJaponesa}</p>
                                    <p><strong>Motivo :</strong> {selectedPerson.motivoProblemaJusticaJaponesa}</p>
                                    <p><strong>Escolaridade:</strong> {selectedPerson.escolaridade}</p>
                                    <p><strong>Tipo de serviço [Brasil] :</strong> {selectedPerson.tipoServicoBrasil}</p>
                                    <p><strong>Fábrica [Brasil] :</strong> {selectedPerson.fabricaBrasil}</p>

                                </div>
                                <div>
                                    <p><strong>Local [Brasil] :</strong> {selectedPerson.localBrasil}</p>
                                    <p><strong>Período (Mes e Ano) [Brasil] :</strong> {selectedPerson.periodoBrasil}</p>


                                    <br />
                                    <p><strong>Tipo de serviço [Japão] :</strong> {selectedPerson.tipoServicoJapao}</p>
                                    <p><strong>Fábrica [Japão] :</strong> {selectedPerson.fabricaJapao}</p>
                                    <p><strong>Local [Japão] :</strong> {selectedPerson.localJapao}</p>
                                    <p><strong>Período (Mes e Ano) [Japão] :</strong> {selectedPerson.periodoJapao}</p>




                                    <p><strong>Tipo de serviço [Último Serviço] :</strong> {selectedPerson.tipoServicoUltimo}</p>
                                    <p><strong>Fábrica [Último Serviço] :</strong> {selectedPerson.fabricaUltimoServico}</p>
                                    <p><strong>Local [Último Serviço] :</strong> {selectedPerson.localUltimoServico}</p>
                                    <p><strong>Período (Mes e Ano) [Último Serviço] :</strong> {selectedPerson.periodoUltimoServico}</p>
                                    <p><strong>Tem preferência por região de trabalho :</strong> {selectedPerson.preferenciaRegiaoTrabalho}</p>


                                </div>
                                {/* 
                                <p style={{ position: 'absolute', bottom: '-430px', left: '30px' }}>
                                    <strong>Nome da empresa aqui</strong>
                                </p> */}

                            </div>
                        </div>
                        <button className="download-button" onClick={handleDownloadPDF}>
                            Baixar PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Files;
