import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfigObj, applyDataFct) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfigObj.url,
                {
                    method: requestConfigObj.method ? requestConfigObj.method : 'GET',
                    headers: requestConfigObj.headers ? requestConfigObj.headers : "",
                    body: requestConfigObj.body ? JSON.stringify(requestConfigObj.body) : null
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();

            applyDataFct(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {isLoading, error, sendRequest};
};

export default useHttp;