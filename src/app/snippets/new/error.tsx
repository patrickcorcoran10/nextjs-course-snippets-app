'use client';

interface ErrorPageProps {
    error: Error,
    reset: () => void;
}

export default function errorPage({error}: ErrorPageProps) {
    return <div>{error.message}</div>
}