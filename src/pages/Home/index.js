import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, ListaRepo, DeleteButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Home() {
    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const reposStorage = localStorage.getItem('repos');

        if (reposStorage) {
            setRepositorios(JSON.parse(reposStorage));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repositorios));
    }, [repositorios]);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            async function submit() {
                setLoading(true);
                try {
                    if(newRepo === '') {
                        throw new Error('Você precisa indicar um repositório');
                    }

                    const response = await api.get(`repos/${newRepo}`);
                    const hasRepo = repositorios.find(r => r.name === newRepo);

                    if(hasRepo) {
                        throw new Error('Esse repositório já está salvo na sua lista');
                    }

                    const data = {
                        name: response.data.full_name,
                    };

                    setRepositorios([...repositorios, data]);
                    setNewRepo("");
                } catch (error) {
                    console.log(error.message)
                    setAlert(true);
                } finally {
                    setLoading(false);
                }
            }

            submit();
        },
        [newRepo, repositorios]
    );

    const handleDeleteRepo = useCallback(
        (repo) => {
            const find = repositorios.filter((r) => r.name !== repo);
            setRepositorios(find);
        },
        [repositorios]
    );

    function handleInputChange(e) {
        setNewRepo(e.target.value);
        setAlert(null);
    }

    return (
        <div>
            <Container>
                <h1>
                    <FaGithub />
                    Meus Repositórios
                </h1>

                <Form onSubmit={handleSubmit} error={alert}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        value={newRepo}
                        onChange={handleInputChange}
                    />

                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? <FaSpinner color="#fff" size={14} /> : <FaPlus color="#fff" size={14} />}
                    </SubmitButton>
                </Form>

                <ListaRepo>
                    {repositorios.map((item) => (
                        <li key={item.name}>
                            <span>
                                <DeleteButton onClick={() => handleDeleteRepo(item.name)}>
                                    <FaTrash color="#cf0f50" size={14} />
                                </DeleteButton>
                                {item.name}
                            </span>
                            <Link to={`/repositorio/${encodeURIComponent(item.name)}`}>
                                <FaBars color="#0d2636" size={14} />
                            </Link>
                        </li>
                    ))}
                </ListaRepo>
            </Container>
        </div>
    );
}

//Listar
//Deletar da lista
