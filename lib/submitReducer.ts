type State = {
    pending: boolean;
    success: boolean;
    errorMessage: string;
};

type Action = { type: 'submit' } | { type: 'success' } | { type: 'error'; message: string };

export const initialSubmitState: State = {
    pending: false,
    success: false,
    errorMessage: ''
};

export const submitReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'submit':
            return {
                pending: true,
                success: false,
                errorMessage: ''
            };
        case 'success':
            return {
                pending: false,
                success: true,
                errorMessage: ''
            };
        case 'error':
            return {
                pending: false,
                success: false,
                errorMessage: action.message
            };
        default:
            return state;
    }
};
