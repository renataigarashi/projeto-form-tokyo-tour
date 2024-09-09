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
                    <li className="no-data">Carregando.</li>
                )}
            </ul>


            {selectedPerson && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleClose}>&times;</span>
                        <div id="person-details" className="person-details" style={{ fontSize: '8px', textTransform: 'uppercase' }}>
                            <img src={logo} width={50} style={{ marginBottom: '-50px' }} />
                            <h2 style={{ textAlign: 'center' }}>FICHA DE CADASTRO</h2>
                            <h3 style={{ width: '100%', textAlign: 'center', background: 'rgba(18, 33, 126, 255)', color: 'white', textTransform: 'uppercase' }}>Dados Pessoais</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div style={{ margin: '0 10px' }}>
                                    <div style={{ width: '100px', marginTop: '10px' }}>
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
                                    <p><strong>Endereço:</strong> <br />{selectedPerson.endereco}</p>
                                    <p><strong>Telefone Residencial:</strong> {selectedPerson.fone_residencial}</p>
                                    <p><strong>Celular:</strong> {selectedPerson.celular}</p>
                                    <p><strong>Recado:</strong> {selectedPerson.recado}</p>
                                    <p><strong>Email:</strong> {selectedPerson.email}</p>



                                </div>
                            </div>
                            {/* <hr /> */}
                            <h3 style={{ width: '100%', textAlign: 'center', background: 'rgba(18, 33, 126, 255)', color: 'white', textTransform: 'uppercase' }}>Documentos</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>
                                    <p><strong>Passaporte:</strong> {selectedPerson.passaporte}</p>
                                    <p><strong>Vencimento Passaporte:</strong> {selectedPerson.vencimento_passaporte}</p>
                                    <p><strong>Visto:</strong> {selectedPerson.visto}</p>
                                    <p><strong>Vencimento Visto:</strong> {selectedPerson.vencimento_visto}</p>
                                </div>
                                <div>
                                    <p><strong>Entrada Japão:</strong> {selectedPerson.entrada_japao}</p>
                                    <p><strong>CNH:</strong> {selectedPerson.cnh}</p>
                                    <p><strong>CNH País:</strong> {selectedPerson.cnh_pais}</p>
                                    <p><strong>CNH Qual:</strong> {selectedPerson.cnh_qual}</p>
                                </div>


                            </div>
                            <h3 style={{ width: '100%', textAlign: 'center', background: 'rgba(18, 33, 126, 255)', color: 'white', textTransform: 'uppercase' }}>Familiares</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>
                                    <p style={{ width: '200px' }}><strong>Nome dos País:</strong> <br />{selectedPerson.pais_nome}</p>
                                    <p><strong>Nome do Cônjuge:</strong> {selectedPerson.conjuge_nome}</p>
                                    <p><strong>Idade do Cônjuge:</strong> {selectedPerson.conjuge_idade}</p>
                                </div>
                                <div>
                                    <p><strong>Ocupação do Cônjuge:</strong> {selectedPerson.ocupacao}</p>
                                    <p><strong>Nome do Filho(a):</strong> {selectedPerson.nomeFilho}</p>
                                    <p><strong>Idade do Filho(a):</strong> {selectedPerson.idadeFilho}</p>
                                    <p><strong>Ocupação do Filho(a):</strong> {selectedPerson.ocupacaoFilho}</p>
                                </div>


                            </div>
                            <h3 style={{ width: '100%', textAlign: 'center', background: 'rgba(18, 33, 126, 255)', color: 'white', textTransform: 'uppercase' }}>Saúde</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>

                                    <p><strong>Fumante:</strong> {selectedPerson.fumante}</p>
                                    <p><strong>Diabetes:</strong> {selectedPerson.diabetes}</p>
                                    <p><strong>Problemas Respiratórios:</strong> {selectedPerson.problemasRespiratorios}</p>
                                    <p><strong>Pode fazer turno alternado:</strong> {selectedPerson.podeFazerTurnoAlternado}</p>
                                    <p><strong>Doença Crônica:</strong> {selectedPerson.doencaCronica}</p>
                                    <p><strong>Consegue distinguir cores:</strong> {selectedPerson.consegueDistinguirCores}</p>
                                    <p><strong>Problema de Coluna:</strong> {selectedPerson.problemaColuna}</p>
                                </div>
                                <div>
                                    <p><strong>Sofreu Cirurgia:</strong> {selectedPerson.sofreuCirurgia}</p>
                                    <p><strong>Toma Medicamentos:</strong> {selectedPerson.tomaMedicamentos}</p>
                                    <p><strong>Tipo de Medicamento:</strong> {selectedPerson.especificacaoMedicamentos}</p>
                                    <p><strong>Epilepsia:</strong> {selectedPerson.epilepsia}</p>
                                    <p><strong>Tendinite:</strong> {selectedPerson.tendinite}</p>
                                    <p><strong>Usa Óculos:</strong> {selectedPerson.usaOculos}</p>
                                    <p><strong>Graus Óculos:</strong> {selectedPerson.grausOculos}</p>



                                </div>
                                <div>
                                    <p><strong>Alergia:</strong> {selectedPerson.alergia}</p>
                                    <p><strong>Tipo de Alergia:</strong> {selectedPerson.especificacaoAlergia}</p>
                                    <p><strong>Asma:</strong> {selectedPerson.asma}</p>
                                    <p><strong>Deficiência Auditiva:</strong> {selectedPerson.deficienciaAuditiva}</p>
                                    <p><strong>Gravidez:</strong> {selectedPerson.gravidez}</p>
                                    <p><strong>Tempo de Gravidez:</strong> {selectedPerson.tempoGravidez}</p>
                                    <p><strong>Restrição para Trabalhar em Pé:</strong> {selectedPerson.restricaoTrabalharEmPe}</p>

                                </div>
                                <div>
                                    <p><strong>Problema Psicológico:</strong> {selectedPerson.problemaPsicologico}</p>
                                    <p><strong>Tipo Problema Psicológico:</strong> {selectedPerson.especificacaoProblemaPsicologico}</p>
                                    <p><strong>Doença Grave:</strong> {selectedPerson.doencaGrave}</p>
                                    <p><strong>Especificação da Doença Grave:</strong> {selectedPerson.especificacaoDoencaGrave}</p>
                                    <p><strong>Pressão Arterial:</strong> {selectedPerson.pressaoArterial}</p>
                                    <p><strong>Habilidade:</strong> {selectedPerson.habilidade}</p>
                                    <p><strong>Tipo Sanguíneo:</strong> {selectedPerson.tipoSanguineo}</p>
                                </div>
                            </div>

                            <h3 style={{ width: '100%', textAlign: 'center', background: 'rgba(18, 33, 126, 255)', color: 'white', textTransform: 'uppercase' }}>Currículo</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <div>
                                    <p><strong>Fábrica [Brasil] :</strong> {selectedPerson.fabricaBrasil}</p>
                                    <p><strong>Tipo de serviço [Brasil] :</strong> {selectedPerson.tipoServicoBrasil}</p>
                                    <p><strong>Local [Brasil] :</strong> {selectedPerson.localBrasil}</p>
                                    <p style={{ width: '200px' }}><strong>Período (Mes e Ano) [Brasil] :</strong> {selectedPerson.periodoBrasil}</p>





                                </div>
                                <div>
                                    <p><strong>Fábrica [Japão] :</strong> {selectedPerson.fabricaJapao}</p>
                                    <p><strong>Tipo de serviço [Japão] :</strong> {selectedPerson.tipoServicoJapao}</p>
                                    <p><strong>Local [Japão] :</strong> {selectedPerson.localJapao}</p>
                                    <p><strong>Período (Mes e Ano) [Japão] :</strong> {selectedPerson.periodoJapao}</p>
                                    <p style={{ width: '200px' }}> <strong>Tem preferência por região de trabalho :</strong> {selectedPerson.preferenciaRegiaoTrabalho}</p>




                                </div>
                                <div>
                                    <p><strong>Último  Emprego no Brasil :</strong> {selectedPerson.utlimoEmpregoBrasil}</p>
                                    <p><strong>Empresa [Último Serviço] :</strong> {selectedPerson.fabricaUltimoServico}</p>
                                    <p style={{ width: '200px' }}><strong>Tipo de serviço [Último Serviço] :</strong> {selectedPerson.tipoServicoUltimo}</p>
                                    <p><strong>Local [Último Serviço] :</strong> {selectedPerson.localUltimoServico}</p>
                                    <p style={{ width: '200px' }}><strong>Período (Mes e Ano) [Último Serviço] :</strong> {selectedPerson.periodoUltimoServico}</p>
                                </div>
                            </div>



                            <h3 style={{ width: '100%', textAlign: 'center', background: 'rgba(18, 33, 126, 255)', color: 'white', textTransform: 'uppercase' }}>Informações Adicionais</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto' }}>
                                <div>
                                    <p><strong>Escolaridade:</strong> {selectedPerson.escolaridade}</p>
                                    <p><strong>Possui Tatuagem/Piercing:</strong> {selectedPerson.possuiTatuagemPiercing}</p>
                                    <p><strong>Manequim:</strong> </p>
                                    <p><strong>Peso:</strong> {selectedPerson.peso}</p>
                                    <p><strong>Altura:</strong> {selectedPerson.altura}</p>
                                    <p><strong>Calçado:</strong> {selectedPerson.calcado}</p>
                                    <p><strong>Quando Pretende Ir ao Japão:</strong> {selectedPerson.quandoPretendeIrJapao}</p>
                                    <p><strong>Quanto Tempo Pretende Ficar:</strong> {selectedPerson.quantoTempoPretendeFicar}</p>

                                </div>
                                <div>
                                    <p><strong>Previsão de Sair o Visto:</strong> {selectedPerson.precisaSairVisto}</p>
                                    <p><strong>Pode fazer hora extra:</strong> {selectedPerson.hora_extra}</p>
                                    <p><strong>Religião:</strong> {selectedPerson.religiao}</p>
                                    <p><strong>Problema Justiça Japonesa:</strong> {selectedPerson.problemaJusticaJaponesa}</p>
                                    <p><strong>Motivo [Problema com a justiça Japonesa]:</strong> {selectedPerson.motivoProblemaJusticaJaponesa}</p>
                                    <p><strong>língua [Japonesa]:</strong> {selectedPerson.linguaJaponesaFala}</p>
                                    <p><strong>língua [Entendimento]:</strong> {selectedPerson.linguaJaponesaEntende}</p>

                                </div>
                                <div>
                                    <p><strong>língua [Fala]:</strong> {selectedPerson.linguaJaponesaFala}</p>
                                    <p><strong>Hiragana [Leitura]:</strong> {selectedPerson.hiraganaLeitura}</p>
                                    <p><strong>Hiragana [Escrita]:</strong> {selectedPerson.hiraganaEscrita}</p>
                                    <p><strong>Katakana [Leitura]:</strong> {selectedPerson.katakanaLeitura}</p>
                                    <p><strong>Katakana [Escrita]:</strong> {selectedPerson.katakanaEscrita}</p>
                                    <p><strong>Kanji [Leitura]:</strong> {selectedPerson.kanjiLeitura}</p>
                                    <p><strong>Kanji [Escrita]:</strong> {selectedPerson.kanjiEscrita}</p>
                                    <p><strong>Observação:</strong> <br /> {selectedPerson.observacao}</p>

                                </div>

                            </div>
                            <div style={{ marginTop: '120px' }}>
                                <h2 style={{ textAlign: 'center', fontSize: '24px !important' }}>Mais imagens:</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '5fr 5fr', margin: 'auto' }}>
                                    {selectedPerson.foto02 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto02 && (
                                                <img src={selectedPerson.foto02} alt="Foto 02" style={{ width: '200px', margin: 'auto', display: 'flex' }} />
                                            )}
                                        </div>
                                    )}
                                    {selectedPerson.foto02 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto02 && (
                                                <img src={selectedPerson.foto02} alt="Foto 02" style={{ width: '200px', margin: 'auto', display: 'flex' }} />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '5fr 5fr', margin: 'auto' }}>
                                    {selectedPerson.foto02 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto02 && (
                                                <img src={selectedPerson.foto02} alt="Foto 02" style={{ width: '200px', margin: 'auto', display: 'flex' }} />
                                            )}
                                        </div>
                                    )}
                                    {selectedPerson.foto02 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto02 && (
                                                <img src={selectedPerson.foto02} alt="Foto 02" style={{ width: '200px', margin: 'auto', display: 'flex' }} />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* {selectedPerson.foto03 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto03 && (
                                                <img src={selectedPerson.foto03} alt="Foto 03" />
                                            )}
                                        </div>
                                    )}    {selectedPerson.foto04 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto04 && (
                                                <img src={selectedPerson.foto04} alt="Foto 04" />
                                            )}
                                        </div>
                                    )}
                                    {selectedPerson.foto05 && (
                                        <div className="photo-container" style={{ marginTop: '0px' }}>
                                            {selectedPerson.foto05 && (
                                                <img src={selectedPerson.foto05} alt="Foto 05" />
                                            )}
                                        </div>
                                    )} */}
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