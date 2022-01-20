import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

const parseQuery = (search: string) =>
  Object.fromEntries(
    new URLSearchParams(search) as unknown as Iterable<[string, string]>
  )

const useQuery = () => {
  const location = useLocation<null>()
  const [query, setQuery] = useState(() => parseQuery(location.search))
  useEffect(() => {
    setQuery(parseQuery(location.search))
  }, [location.search])
  return query
}

export default useQuery
