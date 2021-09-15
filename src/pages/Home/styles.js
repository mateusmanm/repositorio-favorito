import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    width: 100%;
    max-width: 700px;
    padding: 30px;
    border-radius: 10px;
    margin: 80px auto;

    h1 {
        color: #0d2636;
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        svg {
            margin-right: 10px;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: row;

    input {
        border: 01px solid ${(props) => (props.error ? "#ff0000" : "#ddd")};
        height: 40px;
        border-radius: 04px;
        width: 100%;
        padding: 10px;
        color: #222;
    }
`;

const animateRotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    
    to {
        transform: rotate(360deg);
    }
`;

export const ListaRepo = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 16px;

    li {
        display: flex;
        flex-direction: row;
        padding: 18px 0;
        justify-content: space-between;
        align-items: center;

        & + li {
            border-top: 01px solid #eee;
        }

        span {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
`;

export const DeleteButton = styled.button.attrs((props) => ({
    type: "submit",
    disabled: props.loading,
}))`
    border: none;
    outline: none;
    background-color: transparent;

    svg {
        margin-right: 8px;
    }
`;

export const SubmitButton = styled.button.attrs((props) => ({
    type: "submit",
    disabled: props.loading,
}))`
    border: none;
    width: 44px;
    height: 40px;
    background-color: #0d2636;
    border-radius: 4px;
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    &[disabled] {
        cursor: not-allowed;
        opacity: 0.5;
    }

    ${(props) =>
        props.loading &&
        css`
            svg {
                animation: ${animateRotate} 2s linear infinite;
            }
        `}
`;
