type SearchParamSetterCallback = (params: Map<string, string>) => void;

/**
 * @description a utility function for setting and getting browser search parameters
 */
export const useSearchParams = (): [() => Map<string, string>, (callback: SearchParamSetterCallback) => void] =>{
  const getSearchParams = (): Map<string, string> => {
    const searchParams = new URLSearchParams(window.location.search)
    const map = new Map()
    for (const [ key, value ] of searchParams.entries()) {
      map.set(key, value)
    }
    return map
  }

  const setSearchParams = (callback: SearchParamSetterCallback): void => {
    const currentParams = getSearchParams()
    callback(currentParams)

    const newSearchParams = new URLSearchParams()
    for (const [ key, value ] of currentParams.entries()) {
      if (value === null) {
        newSearchParams.delete(key)
      } else {
        newSearchParams.set(key, value)
      }
    }

    const newUrl = new URL(window.location.href)
    newUrl.search = newSearchParams.toString()
    window.history.pushState({}, '', newUrl.toString())
  }

  return [ getSearchParams, setSearchParams ]
}
