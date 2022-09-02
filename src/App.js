import { useState } from 'react'

const App =()=> {
  const [ firstName , setFirstName] = useState('')
  const [ lastName , setLastName] = useState('')
  const [ birthDay , setBirthDay] = useState('')
  const [ sex , setSex] = useState('other')
  const [ contactDetail , setContactDetail] = useState({})
  const [ physicalAttr , setPhysicalAttr] = useState({})

  const handleChange = (fn) => {
    return (e) => {
      fn(e.target.value)
    }
  }

  return (
    <>
    <h1 className="font-sans">Form</h1>
    <form>
      <h1>Bio</h1>
      <div>
        <input value={firstName} placeholder="First Name" onChange={handleChange(setFirstName)}/>
        <input value={lastName} placeholder="Last Name" onChange={handleChange(setLastName)}/>
        <input type="date" value={birthDay} placeholder="Last Name" onChange={handleChange(setBirthDay)}/>
        <select name="sex" id="selectSex" defaultValue={sex} onChange={handleChange(setSex)}>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Select Gender</option>
        </select>
      </div>
      <h1>Contact</h1>
      <div>
        <input name = "address" placeholder="Mailing Address" onChange={(e) => setContactDetail({...contactDetail, mailAddress: e.target.value})}/>
      </div>
      <div>
        <input name="telephone" placeholder="Contact Number" onChange={(e) => setContactDetail({...contactDetail, contactNumber: e.target.value})}/>
        <input name="email" placeholder="Email" onChange={(e) => setContactDetail({...contactDetail, emailAddress: e.target.value})}/>
      </div>
      <h1>Physical Traits</h1>
      <div>
        <input name ="hair" placeholder="Hair color" onChange={(e) => setPhysicalAttr({...physicalAttr, hairColor: e.target.value})}/>
        <input name ="eye" placeholder="Eye color" onChange={(e) => setPhysicalAttr({...physicalAttr, eyeColor: e.target.value})}/>
      </div>
      <div>
        <input name="height" placeholder="Height in cm" onChange={(e) => setPhysicalAttr({...physicalAttr, bodyHeight: e.target.value})}/>
        <input name="weight" placeholder="Weight in Kg" onChange={(e) => setPhysicalAttr({...physicalAttr, bodyWeight: e.target.value})}/>
        <input name="bloodType" placeholder="Blood Type" onChange={(e) => setPhysicalAttr({...physicalAttr, bloodType: e.target.value})}/>
      </div>
    </form>
    </>
  );
}

export default App;
