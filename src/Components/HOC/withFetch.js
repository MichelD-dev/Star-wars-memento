import { useEffect, useState } from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

function withFetch(WrappedComponent) {
  const WithFetch = props => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
      if (props.category) fetchData(props.category.category)
    }, [props.category])

    const saveData = json => {
      setData([...data, json])
      setIsLoading(false)
    }

    useEffect(() => console.log(isLoading), [isLoading])

    const fetchData = async category => {
      try {
        setIsLoading(true)
        const response = await fetch(`http://swapi.dev/api/${category}`)
        if (response.ok) {
          const json = await response.json()
          saveData(json)
        } else {
          throw new Error('Fetch request error')
        }
      } catch (err) {
        setIsLoading(false)
        setIsError(err)
      }
    }

    return isLoading ? (
      <Dimmer blurring active>
        <Loader inverted size='big' style={{ opacity: '.8' }}>
          Veuillez patienter...
        </Loader>
      </Dimmer>
    ) : (
      <WrappedComponent
        data={data}
        isLoading={isLoading}
        isError={isError}
        {...props}
        cat={props.category.category}
      />
    )
  }

  return WithFetch
}

export default withFetch
