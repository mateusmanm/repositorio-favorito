import React, { useState, useEffect } from "react";
import { Container, Owner, BackButton, IssuesList, ControlPage, Footer, Filtro } from "./styles";
import { FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";

export default function Repositorio({ match }) {
    const repoName = decodeURIComponent(match.params.repositorio);
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [stateIssue, setStateIssue] = useState([
        {state: 'all', label: 'Todas', active: true},
        {state: 'open', label: 'Abertos', active: false},
        {state: 'closed', label: 'Fechados', active: false},
    ]);
    const [stateIndex, setStateIndex] = useState(0);

    async function load() {
        const [repositorioData, issuesData] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: stateIssue[stateIndex].state,
                    page,
                    per_page: 5,
                },
            }),
        ]);

        setRepositorio(repositorioData.data);
        setIssues(issuesData.data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    useEffect(() => {
        setLoading(true);
        load();
    }, [page]);

    useEffect(() => {
        setLoading(true);
        setPage(1);
        load();
    }, [stateIndex]);

    function handleChangePage(p) {
        setPage(p === "next" ? page + 1 : page - 1);
    }

    function handleChangeFiltro(state) {
        setStateIndex(state);
    }

    if (loading) {
        return (
            <Container>
                <Owner>
                    <h1>Carregando...</h1>
                </Owner>
            </Container>
        );
    }

    return (
        <div>
            <Container>
                <BackButton to="/">
                    <FaArrowLeft size={24} />
                </BackButton>
                <Owner>
                    <img src={repositorio.owner.avatar_url} alt={repositorio.owner.login} />
                    <h1>{repositorio.name}</h1>
                    <p>{repositorio.description}</p>
                </Owner>
                <Filtro active={stateIndex}>
                    <p>Listar:</p>
                    <div className="lista-filtros">
                        {stateIssue.map((filter, index) => (
                            <button type="button" key={filter.label} onClick={() => handleChangeFiltro(index)} >{filter.label}</button>
                        ))}
                    </div>
                </Filtro>
                <IssuesList>
                    {issues.map((issue) => (
                        <li key={issue.id}>
                            <img src={issue.user.avatar_url} alt={issue.title} />

                            <div>
                                <a href={issue.html_url} target="_blank">{issue.state + ": " + issue.title}</a>

                                <div className="Labels">
                                    {issue.labels.map((item) => (
                                        <span key={item.id}>{item.name}</span>
                                    ))}
                                </div>

                                <p className="autor">Autor: {issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssuesList>
                <Footer>
                    <ControlPage onClick={() => handleChangePage("back")} disabled={page < 2}>
                        Voltar
                    </ControlPage>
                    <ControlPage onClick={() => handleChangePage("next")}>Próxima</ControlPage>
                </Footer>
            </Container>
        </div>
    );
}
