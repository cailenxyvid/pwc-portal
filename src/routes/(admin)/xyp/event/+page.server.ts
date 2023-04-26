import type { Actions } from './$types';

export const actions = {
    default: async (event) => {
        console.log('POST',event.params)
    }
} satisfies Actions;
