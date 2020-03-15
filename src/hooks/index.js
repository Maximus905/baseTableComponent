import {useEffect} from 'react'

export function useEvent(event, handler) {
    useEffect(() => {
        window.addEventListener(event, handler)
        return function cleanup() {
            window.removeEventListener(event, handler)
        }
    })
}