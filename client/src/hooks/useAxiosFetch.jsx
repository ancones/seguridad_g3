import { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const effectRan = useRef(false)

    useEffect(() => {
        console.log('effect ran');
        let isMounted = true;
        const source = axios.CancelToken.source();

        if (effectRan.current === true) {

            const fetchData = async (url) => {
                setIsLoading(true);
                try {
                    const response = await axiosPrivate.get(url, {
                        cancelToken: source.token
                    });
                    if (isMounted) {
                        console.log(response.data)
                        setData(response.data);
                        setFetchError(null);
                    }
                } catch (err) {
                    if (isMounted) {
                        setFetchError(err.message);
                        setData([]);
                    }
                } finally {
                    isMounted && setIsLoading(false);
                }
            }

            fetchData(dataUrl);
        }

        const cleanUp = () => {
            console.log('unmounted');
            effectRan.current = true
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    return { data, fetchError, isLoading };
}

export default useAxiosFetch;