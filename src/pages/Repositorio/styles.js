import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 700px;
    padding: 30px;
    border-radius: 10px;
    margin: 80px auto;
`;

export const Owner = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        margin: 0;
        max-width: 150px;
        background-color: #eee;
        border-radius: 300px;
        padding: 20px;
        margin-bottom: 15px;
    }

    h1 {
        margin-bottom: 8px;
    }

    p {
        max-width: 400px;
        line-height: 150%;
        color: 484848;
    }
`;

export const BackButton = styled(Link)`
    color: #0d2636;
    background-color: transparent;
`;

export const IssuesList = styled.ul`
    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 20px 0;

        img {
            width: 50px;
            border-radius: 50%;
            margin-right: 15px;
        }

        & + li {
            border-top: 01px solid #eee;
        }

        div {
            display: flex;
            flex-direction: column;

            a {
                margin-bottom: 14px;
                color: #0d2636;
                transition: 0.1s all ease-in-out;

                &:hover {
                    color: blue;
                    text-decoration: none;
                }
            }

            .autor {
                font-style: italic;
                font-size: 13px;
                color: #888;
            }

            .Labels {
                display: inline-block;
                flex-direction: row;

                span {
                    background-color: #484848;
                    color: #fff;
                    padding: 5px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    display: inline-block;
                    margin-bottom: 8px;
                    margin-right: 5px;
                }
            }
        }
    }
`;

export const ControlPage = styled.button`
    color: #fff;
    background-color: #0d2636;
    border: none;
    outline: none;
    padding: 7px 10px;
    border-radius: 5px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
`;

export const Filtro = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-top: 01px solid #eee;
    border-bottom: 01px solid #eee;
    padding: 10px;
    margin-top: 15px;

    .lista-filtros {
        display: flex;
        flex-direction: row;
        margin-left: 10px;

        button {
            background-color: transparent;
            border: 01px solid #eee;
            margin-right: 5px;
            padding: 7px 10px;
            border-radius: 5px;
            cursor: pointer;

            &:nth-child(${props => props.active + 1}) {
                background-color: #0071db;
                color: #fff;
            }
        }
    }
`;
