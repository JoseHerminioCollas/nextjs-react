import React from 'react'
import { isNameValid, getLocations } from '../mock-api/apis'
/*
Component: NameLocationInput

Set up input fields: Name and Country for a user to supply values.
Check user input for name and validate on change.
Display an Add button for the user to add the values to a list.
The list is displayed with the input fields itself.
Receive location values from API.
Disable Add button on certain conditions.
 */
const NameLocationInput = () => {
  const [userName, setUserName] = React.useState('')
  const [userNames, setUserNames] = React.useState([])
  const [location, setLocation] = React.useState('Canada')
  const [userLocations, setUserLocations] = React.useState([])
  const [isUserNameValid, setIsUserNameValid] = React.useState(true)
  const [locationSelections, setLocationSelections] = React.useState([])

  React.useEffect(() => {
    getLocations().then(locations => setLocationSelections(locations))
  }, [])

  return (
    <section>
      <label>
        <div>Name</div>
        <input onChange={
          e => {
            setUserName(e.target.value)
            isNameValid(e.target.value).then(x => {
              setIsUserNameValid(x)
            })
          }
        } value={userName}></input>
        {!isUserNameValid && <div className='message'>This name has been taken</div>}
      </label>
      <label>
        <div>Location</div>
        <select
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          {locationSelections.map(e => <option value={e}>{e}</option>)}
        </select>
      </label>
      <div>
        <button onClick={() => {
          setUserNames([])
          setUserLocations([])
        }}>Clear</button>
        <button onClick={
          (e) => {
            setUserNames([...userNames, userName])
            setUserLocations([...userLocations, location])
          }
        } disabled={!isUserNameValid || userName === ''}>Add</button>
      </div>
      <table>
        <tr>
          <td>Name</td>
          <td>Location</td>
        </tr>
        {userNames.map((e, i) => <tr key={i}><td>{e}</td><td>{userLocations[i]}</td></tr>)}
      </table>

    </section>
  )
}

export default NameLocationInput