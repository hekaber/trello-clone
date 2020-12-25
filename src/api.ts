import { DataState } from './AppStateContext';

export const save = (payload: DataState) => {

    return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/save`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => {
        return response.json()
    })
    .catch(console.log);
}

export const load = () => {

    return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/load`)
    .then((response) => {
        return response.json() as Promise<DataState>
    });
}