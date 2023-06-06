import { toastStore } from '@skeletonlabs/skeleton';

export const displayError = (message:string) => {
    console.error(message);
    toastStore.trigger({
        message: message,
        background: 'variant-filled-error',
        timeout: 10000
    });
}

export const displayWarning = (message:string) => {
    console.warn(message);
    toastStore.trigger({
        message: message,
        background: 'variant-filled-warning',
        timeout: 10000
    });
}

export const displaySuccess = (message:string) => {
    console.log(message);
    toastStore.trigger({
        message: message,
        background: 'variant-filled-success',
        timeout: 10000
    });
}