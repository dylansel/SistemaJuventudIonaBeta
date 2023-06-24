export const BAD_REQUEST_ERROR_ENG = "Request failed with status code 400"
export const BAD_REQUEST_ERROR_SPA = "Petición incorrecta a la base de datos"

export const NOT_FOUND_ERROR_ENG = "Network Error"
export const NOT_FOUND_ERROR_SPA = "Error de Conexión"

export const DEFAULT_ERROR_SPA = "Error desconocido, Comunicate con un desarrollador";

export const getErrorByMessage = (error: any) => {
    switch (error) {
        case NOT_FOUND_ERROR_ENG:
            return NOT_FOUND_ERROR_SPA

        case BAD_REQUEST_ERROR_ENG:
            return BAD_REQUEST_ERROR_SPA
        default:
            return DEFAULT_ERROR_SPA
    }
}