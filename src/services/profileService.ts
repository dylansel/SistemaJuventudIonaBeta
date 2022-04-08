import axios from 'axios';
import ProfileDTO from '../dtos/ProfileDTO';

export const getProfile = async (getAccessTokenSilently: any): Promise<ProfileDTO> => {
    try {
        const token = await getAccessTokenSilently();
        const response = await axios(`${process.env.REACT_APP_BACKEND_DOMAIN!}/profile/`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        const data = await response.data
        return data
    } catch (error: any) {
        throw error
    }
}